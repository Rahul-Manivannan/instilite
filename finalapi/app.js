const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
const db = require('./database');
const session = require('express-session');
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(bodyParser.json());

app.listen(3000, () => {
  console.log('Server is listening');
});
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  })
);

//sessions start
app.post('/login', async (req, res) => {
  const { user_id, user_password } = req.query;
  try {
    const query = 'SELECT * FROM usercreds WHERE user_id = ? AND user_password = ?';
    db.query(query, [user_id, user_password], async (err, results) => {
      if (err) throw err;
      if (results.length === 0) {
        // throw new Error('Invalid username or password');
        res.json('invalid username or password');
      }
      else{
      const user = {
        user_id: results[0].user_id,
        user_name: results[0].user_name,
        user_role: results[0].user_role
      };
      req.session.user = user;
      req.session.save();
      res.json({ message: 'Login successful' });}
    });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(401).json({ message: 'Invalid credentials' });
  }
});
app.post('/logout', (req, res) => {
  if (req.session.user) {
    // If the user is logged in
    req.session.destroy(() => {
      res.send("User logged out!");
    });
  } else {
    // If there is no user session, you can handle it accordingly
    res.send("No user session found");
  }
});
//session end
app.post('/pushevents', (req, res) => {
  const { event_name, event_venue, event_desc, event_posted_date, event_start, event_end, event_visibility} = req.query;
  // const user_id = req.session.user.user_id;
  const user_id ="123";
  console.log(user_id);
  if (!event_start || !event_end || !event_name || !event_venue || !event_desc || !event_posted_date || !event_visibility) {
    return res.status(400).json({ error: 'Invalid parameters' });
  }
  const query = 'INSERT INTO eventsdetails (eventid, event_name, event_venue, event_desc, event_posted_date, user_id, event_date, event_start, event_end, event_visibility) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  let randomInt = 'Hellot';
  // const values = [randomInt, event_name, event_venue, event_desc, event_posted_date, user_id , event_start.slice(0, 10), event_start.slice(11),event_end.slice(11)]; 
  const values = [randomInt, event_name, event_venue, event_desc, event_posted_date, user_id , event_start.slice(0, 10), event_start.slice(11), event_end.slice(11), event_visibility];
  db.query(query, values, (err, result) => {                       
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to add event' });
    } else {
      res.json({ success: true, message: 'Event added successfully' });
    }
  });
});
app.get('/getevents', (req, res) => {
  const user_id = req.session.user.user_id;
  const query = "SELECT * FROM eventsdetails WHERE event_visibility = 'Public' OR (event_visibility = 'Personal' AND user_id = ?)";
  const values = [user_id];
  db.query(query, values, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch events' });
    } else {
      res.json(results);
    }
  });
});


//personal profile print details !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
app.get('/readuserprofile', (req, res) => { 
  const user_id = req.session.user.user_id; // Specify the user_id here
  const sql = "SELECT * FROM usercreds WHERE user_id = ?";
  db.query(sql, [user_id], (err, results) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (results.length === 0) {
       return res.status(404).json({ error: 'User profile not found' });
    }
    res.status(200).json(results[0]);
  });
});

//add data on signing up !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
app.post('/signup', (req, res) => {
  const { user_id, user_name, user_phone, user_password } = req.query; // Assuming names have changed
  if (!user_id || !user_name || !user_phone || !user_password) {
    return res.status(400).json({ error: 'Invalid parameters' });
  }
  const userQuery = `
    INSERT INTO usercreds
      (user_id, user_name, user_phone, user_password, user_role, user_access_token)
    VALUES (?, ?, ?, ?, '"student"', '"denied"')
  `;
  const userValues = [user_id, user_name, user_phone, user_password]; // Updated variable names

  db.query(userQuery, userValues, (err, result) => {
    if (err) {
      console.error('Error adding user:', err);
      return res.status(500).json({ error: 'Failed to add user' });
    }
    res.json({ success: true, message: 'User added successfully' });
  });
});


//update personal portfolio!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

app.post('/updateprofile', (req, res) => {
  // Validate input data
  if (!req.query.user_id || !req.query.new_name || !req.query.new_phone || !req.query.new_password || !req.query.new_linked_in || !req.query.new_desc) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const { new_name, new_phone, new_password, new_linked_in, new_desc, user_id } = req.query;

  // Prepare and execute update query using parameterized statement
  const updateQuery = `
    UPDATE usercreds
    SET user_name = ?, user_phone = ?, user_password = ?, linkedin_id = ?, profile_desc = ?
    WHERE user_id = ?
  `;
  const updateValues = [new_name, new_phone, new_password, new_linked_in, new_desc, user_id];

  db.query(updateQuery, updateValues, (err, result) => {
    if (err) {
      console.error('Error updating user profile:', err);
      return res.status(500).json({ error: 'Failed to update profile' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ success: true, message: 'Profile updated successfully' });
  });
});
//personal profile print details !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
app.get('/readuserprofile', (req, res) => { 
  const user_id = req.session.user.user_id
  const userQuery = "SELECT user_id, user_name, user_phone, linkedin_id, profile_desc FROM usercreds WHERE user_id = ?";    
  db.query(sql, [user_id], (err, results) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (results.length === 0) {
       return res.status(404).json({ error: 'User profile not found' });
    }
    res.status(200).json(results[0]);
  });
});


//team profile print details!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
app.get('/readteamprofile', (req, res) => { 
  //const user_id = req.session.user.user_id;
  const user_id = req.session.user.user_id;
  //const user_id = 'pdc_id';

  const teamQuery = "SELECT * FROM teamsdetails WHERE team_id = ?";    
  db.query(teamQuery, [user_id], (err, results) => {
      if (err) {
          console.error("Error executing SQL query:", err);
          return res.status(500).json({ error: "Internal server error" });
      }

      if (results.length === 0) {
          return res.status(404).json({ error: 'User profile not found' });
      }
      res.status(200).json(results[0]);
  });
});


//updating club profile !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
app.post('/updateclubprofile', (req, res) => {
  
  const user_role = req.session.user.user_role;
  if (user_role !== "team") {
      return res.status(400).json({ error: 'not a team' });
  }

  if (!req.query.team_id || !req.query.new_team_desc || !req.query.new_team_link || !req.query.new_team_apps || !req.query.new_team_heads || !req.query.new_team_members) {
      return res.status(400).json({ error: 'Missing required fields for teamdetails update' });
  }

  const { team_id, new_team_desc, new_team_link, new_team_apps, new_team_heads, new_team_members } = req.query;

  const updateTeamQuery = "UPDATE teamsdetails SET team_desc = ?, team_link = ?, team_apps = ?, team_heads = ?, team_members = ? WHERE team_id = ?";
  const updateTeamValues = [new_team_desc, new_team_link, new_team_apps, new_team_heads, new_team_members, team_id];

  db.query(updateTeamQuery, updateTeamValues, (err, teamResult) => {
      if (err) {
          console.error('Error updating team details:', err);
          return res.status(500).json({ error: 'Failed to update team details' });
      }
      if (teamResult.affectedRows === 0) {
          console.warn('Failed to update team details');
      }

      res.json({ success: true, message: 'Team details updated successfully' });
  });
});