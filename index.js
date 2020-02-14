const express = require('express');
const app = express();
const PORT = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use('/api')

app.listen(PORT, () => {
	console.log(`app running on ${PORT}`);
});
