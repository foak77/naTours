const fs = require('fs');
const express = require('express');

const app = express();

app.use(express.json());

// app.get('/', (req, res) => {
//   res
//     .status(200)
//     .json({ message: 'HELLO FROM THE SERVER SIDE', app: 'Natours' });
// });

// app.post('/', (req, res) => {
//   res.send('YOU CAN POST IN THIS ENDPOINT');
// });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'SUCCESS',
    results: tours.length,
    data: {
      tours,
    },
  });
});

app.get('/api/v1/tours/:id', (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1; //to conver to string
  const tour = tours.find((el) => el.id === id);

  //   if (id > tours.length)
  if (!tour) {
    return res.status(404).json({
      status: 'FAIL',
      message: 'INVALID ID',
    });
  }

  res.status(200).json({
    status: 'SUCCESS',
    data: {
      tour,
    },
  });
});

app.post('/api/v1/tours', (req, res) => {
  //   console.log(req.body);
  const newId = tours[tours.length - 2].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'SUCCESS',
        data: {
          tour: newTour,
        },
      });
    }
  );
});

app.patch('/api/v1/tours/:id', (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'FAIL',
      message: 'INVALID ID',
    });
  }

  res.status(200).json({
    status: 'SUCCESS',
    data: {
      tour: '<UPDATED TOUR HERE...>',
    },
  });
});

app.delete('/api/v1/tours/:id', (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'FAIL',
      message: 'INVALID ID',
    });
  }

  res.status(204).json({
    status: 'SUCCESS',
    data: null,
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`APP RUNNING ON PORT ${port}...`);
});
