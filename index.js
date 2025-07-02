const mongoconnect = require('./database').mongoConnect
const express = require('express')
const cors = require('cors')
const bodyparser = require('body-parser')
const getDb = require('./database').getDb;
const { ObjectId } = require('mongodb')
const http = require('http');
const { Server } = require('socket.io');


const app = express();
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

// Save IO globally for use in routes
app.set('io', io);

io.on('connection', socket => {
  console.log('🔌 Client connected:', socket.id);
});


let port = 8100;
const router = express.Router();
const router2 = express.Router();
const router3 = express.Router();
const router4 = express.Router();
const router5 = express.Router();
const router6 = express.Router();
const router7 = express.Router();
const router8 = express.Router();
const router9 = express.Router();
const router10 = express.Router();
const router11 = express.Router();
const router12 = express.Router();
const router13 = express.Router();
const router14 = express.Router();
const router15 = express.Router();
const router16 = express.Router();
const router17 = express.Router();
const router18 = express.Router();
const router19 = express.Router();
const router20 = express.Router();
const router21 = express.Router();
const router22 = express.Router();
const router23 = express.Router();
const router24 = express.Router();
const router25 = express.Router();
const router26 = express.Router();
const router27 = express.Router();


app.use(cors())
app.use(bodyparser.json({ limit: '100mb' }))
app.use(bodyparser.urlencoded({ limit: '100mb', extended: true }))
//main wala
router.use('/pizza', (req, res, next) => {

  console.log(req)
  const { Discription,Price, img } = req.body
  let db = getDb();
  db.collection('pizza').insertOne({ discription: Discription,price:Price, Image: img}).then((response) => {
    console.log(response);
    res.send({ status: "data inserted" })
  })
})

router2.use('/shake', (req, res, next) => {

  console.log(req)
  const { Discription,Price, img   } = req.body
  let db = getDb();
   db.collection('shake').insertOne({ discription: Discription,price:Price, Image: img}).then((response) => {
    console.log(response);
    res.send({ status: "data inserted" })
  })
})
router3.use('/icecream', (req, res, next) => {

  console.log(req)
  const { Discription,Price,img  } = req.body
  let db = getDb();
  db.collection('icecream').insertOne({ discription: Discription,price:Price, Image: img}).then((response) => {
    console.log(response);
    res.send({ status: "data inserted" })
  })
})

router4.use('/sandwich', (req, res, next) => {

  console.log(req)
  const { Discription,Price, img } = req.body
  let db = getDb();
  db.collection('sandwich').insertOne({ discription: Discription,price:Price,Image: img}).then((response) => {
    console.log(response);
    res.send({ status: "data inserted" })
  })
})

router5.use('/pizzabck', (req, res, next) => {
  let db = getDb();
  db.collection('pizza').find().toArray().then((response) => {

    if (response) {
      console.log(response);
      res.send({ response: response })
    } else {
      console.log('something error')
    }

  })
})
router6.use('/icecreambck', (req, res, next) => {
  let db = getDb();
  db.collection('icecream').find().toArray().then((response) => {

    if (response) {
      console.log(response);
      res.send({ response: response })
    } else {
      console.log('something error')
    }

  })
})   
router7.use('/sandwichbck', (req, res, next) => {
  let db = getDb();
  db.collection('sandwich').find().toArray().then((response) => {

    if (response) {
      console.log(response);
      res.send({ response: response })
    } else { 
      console.log('something error')
    }

  })
})
router8.use('/shakebck', (req, res, next) => {
  let db = getDb();
  db.collection('shake').find().toArray().then((response) => {

    if (response) {
      console.log(response);
      res.send({ response: response })
    } else {
      console.log('something error')
    }

  })
})


router9.post('/buy', async (req, res) => {
  const { productDescription, quantity, customerName, mobileNumber, paymentMethod } = req.body;

  console.log("➡️ Request body:", req.body);

  if (!productDescription || !customerName || !mobileNumber || !paymentMethod) {
    console.log("❌ Missing fields");
    return res.status(400).send({ message: 'All fields are required.' });
  }

  if (!/^\d{10}$/.test(mobileNumber)) {
    console.log("❌ Invalid mobile number");
    return res.status(400).send({ message: 'Mobile number must be exactly 10 digits.' });
  }

  const db = getDb();

  try {
    // Insert order into DB
    const order = {
      productDescription,
      quantity: quantity > 0 ? quantity : 1,
      customerName,
      mobileNumber,
      paymentMethod,
      orderDate: new Date(),
      status: paymentMethod === 'online' ? 'Pending Payment' : 'Pending'
    };

    const result = await db.collection('orders').insertOne(order);
    const orderId = result.insertedId;
    console.log("✅ Order inserted with ID:", orderId);

    // Handle COD
    if (paymentMethod === 'cod') {
      return res.send({ status: 'Order placed (COD)', orderId });
    }

    // Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: productDescription,
          },
          unit_amount: 1000, // Example: $10.00
        },
        quantity,
      }],
      success_url: `${process.env.CLIENT_URL}/success?orderId=${orderId}`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
      metadata: {
        orderId: orderId.toString(),
      },
    });

    console.log("✅ Stripe session created:", session.id);
    return res.send({ sessionUrl: session.url });

  } catch (err) {
    console.error("❌ Order error:", err);
    return res.status(500).send({ message: 'Order failed', error: err.message });
  }
});

router10.use('/categories', (req, res, next) => {

  console.log(req)
  const { Discription, img } = req.body
  let db = getDb();
  db.collection('items').insertOne({ discription: Discription, Image: img}).then((response) => {
    console.log(response);
    res.send({ status: "data inserted" })
  })
})

router11.use('/catego', (req, res, next) => {
  let db = getDb();
  db.collection('items').find().toArray().then((response) => {

    if (response) {
      console.log(response);
      res.send({ response: response })
    } else {
      console.log('something error')
    }

  })
})


router12.get('/pizzaget', (req, res) => {
  let db = getDb();

  db.collection('pizza').find().toArray().then((data) => {
    res.json(data); // frontend ko data bhejna
  }).catch((err) => {
    console.error(err);
    res.status(500).send({ error: "Failed to fetch pizza items" });
  });
});

// DELETE pizza item by ID
router13.delete('/pizzadel/:id', (req, res) => {
   const id = req.params.id;
  const db = getDb();

  try {
    const objectId = new ObjectId(id); // 👈 important
    db.collection('pizza')
      .deleteOne({ _id: objectId })
      .then((result) => {
        console.log("Delete result:", result);
        res.send({ status: "Deleted", result });
      })
      .catch((err) => {
        console.error("Delete error:", err);
        res.status(500).send({ error: "Delete failed" });
      });
  } catch (e) {
    console.error("Invalid ObjectId:", id);
    res.status(400).send({ error: "Invalid ID format" });
  }
});

router14.get('/sandwichget', (req, res) => {
  let db = getDb();

  db.collection('sandwich').find().toArray().then((data) => {
    res.json(data); // frontend ko data bhejna
  }).catch((err) => {
    console.error(err);
    res.status(500).send({ error: "Failed to fetch pizza items" });
  });
});

// DELETE pizza item by ID
router15.delete('/sandwichdel/:id', (req, res) => {
   const id = req.params.id;
  const db = getDb();

  try {
    const objectId = new ObjectId(id); // 👈 important
    db.collection('sandwich')
      .deleteOne({ _id: objectId })
      .then((result) => {
        console.log("Delete result:", result);
        res.send({ status: "Deleted", result });
      })
      .catch((err) => {
        console.error("Delete error:", err);
        res.status(500).send({ error: "Delete failed" });
      });
  } catch (e) {
    console.error("Invalid ObjectId:", id);
    res.status(400).send({ error: "Invalid ID format" });
  }
});

router16.get('/shakeget', (req, res) => {
  let db = getDb();

  db.collection('shake').find().toArray().then((data) => {
    res.json(data); // frontend ko data bhejna
  }).catch((err) => {
    console.error(err);
    res.status(500).send({ error: "Failed to fetch pizza items" });
  });
});

// DELETE pizza item by ID
router17.delete('/shakedel/:id', (req, res) => {
   const id = req.params.id;
  const db = getDb();

  try {
    const objectId = new ObjectId(id); // 👈 important
    db.collection('shake')
      .deleteOne({ _id: objectId })
      .then((result) => {
        console.log("Delete result:", result);
        res.send({ status: "Deleted", result });
      })
      .catch((err) => {
        console.error("Delete error:", err);
        res.status(500).send({ error: "Delete failed" });
      });
  } catch (e) {
    console.error("Invalid ObjectId:", id);
    res.status(400).send({ error: "Invalid ID format" });
  }
});

router18.get('/categoriesget', (req, res) => {
  let db = getDb();

  db.collection('items').find().toArray().then((data) => {
    res.json(data); // frontend ko data bhejna
  }).catch((err) => {
    console.error(err);
    res.status(500).send({ error: "Failed to fetch pizza items" });
  });
});

// DELETE pizza item by ID
router19.delete('/categoriesdel/:id', (req, res) => {
   const id = req.params.id;
  const db = getDb();

  try {
    const objectId = new ObjectId(id); // 👈 important
    db.collection('items')
      .deleteOne({ _id: objectId })
      .then((result) => {
        console.log("Delete result:", result);
        res.send({ status: "Deleted", result });
      })
      .catch((err) => {
        console.error("Delete error:", err);
        res.status(500).send({ error: "Delete failed" });
      });
  } catch (e) {
    console.error("Invalid ObjectId:", id);
    res.status(400).send({ error: "Invalid ID format" });
  }
});

router20.post('/orderpost', async (req, res) => {
  const db = getDb();
  const { customerName, mobileNumber, paymentMethod, cartItems = [] } = req.body;

  if (!customerName || !mobileNumber || !paymentMethod || cartItems.length === 0) {
    return res.status(400).send({ message: 'Missing required fields or empty cart.' });
  }

  const order = {
    customerName,
    mobileNumber,
    paymentMethod,
    items: cartItems.map(item => ({
      discription: item.discription,
      qty: item.qty,
      Image: item.Image,
      price: item.price,
    })),
    status: "Preparing",
    time: new Date().toLocaleTimeString()
  };

  try {
    const result = await db.collection('buyorder').insertOne(order);
    const io = req.app.get('io');

    const insertedOrder = { ...order, _id: result.insertedId };
    io.emit('orderUpdate', insertedOrder);

    res.send({ status: "Order saved", orderId: result.insertedId });
  } catch (err) {
    console.error("❌ Error inserting order:", err);
    res.status(500).send({ error: "Order failed" });
  }
});



    router21.get('/ordersget', (req, res) => {
      const db = getDb();

      db.collection('buyorder').find().toArray()
        .then((orders) => {
          res.json(orders);
        })
        .catch((err) => {
          console.error("❌ Error fetching orders:", err);
          res.status(500).send({ error: "Failed to load orders" });
        });
    });

router22.put('/orderstatus/:id', async (req, res) => {
  const db = getDb();
  const { id } = req.params;
  const { status } = req.body;

  try {
    await db.collection('buyorder').updateOne(
      { _id: new ObjectId(id) },
      { $set: { status } }
    );

    const updatedOrder = await db.collection('buyorder').findOne({ _id: new ObjectId(id) });

    const io = req.app.get('io');
    io.emit('statusUpdate', updatedOrder); // ✅ emit updated full order object

    res.send({ status: 'Updated', updatedOrder });
  } catch (err) {
    console.error("❌ Status update failed:", err);
    res.status(500).send({ error: "Update failed" });
  }
});

router23.delete('/deleteorder/:id', (req, res) => {
  const db = getDb();
  const id = req.params.id;

  db.collection('buyorder').deleteOne({ _id: new ObjectId(id) })
    .then(result => {
      console.log(`🗑️ Order ${id} deleted`);
      res.send({ status: "Deleted", result });
    })
    .catch(err => {
      console.error("❌ Delete failed:", err);
      res.status(500).send({ error: "Delete failed" });
    });
});

router12.get('/icecreamget', (req, res) => {
  let db = getDb();

  db.collection('icecream').find().toArray().then((data) => {
    res.json(data); // frontend ko data bhejna
  }).catch((err) => {
    console.error(err);
    res.status(500).send({ error: "Failed to fetch pizza items" });
  });
});

// DELETE pizza item by ID
router13.delete('/icecreamdel/:id', (req, res) => {
   const id = req.params.id;
  const db = getDb();

  try {
    const objectId = new ObjectId(id); // 👈 important
    db.collection('icecream')
      .deleteOne({ _id: objectId })
      .then((result) => {
        console.log("Delete result:", result);
        res.send({ status: "Deleted", result });
      })
      .catch((err) => {
        console.error("Delete error:", err);
        res.status(500).send({ error: "Delete failed" });
      });
  } catch (e) {
    console.error("Invalid ObjectId:", id);
    res.status(400).send({ error: "Invalid ID format" });
  }
});

router24.use('/Burger', (req, res, next) => {

  console.log(req)
  const { Discription,Price,img  } = req.body
  let db = getDb();
  db.collection('Burger').insertOne({ discription: Discription,price:Price, Image: img}).then((response) => {
    console.log(response);
    res.send({ status: "data inserted" })
  })
})

router25.get('/Burgerget', (req, res) => {
  let db = getDb();

  db.collection('Burger').find().toArray().then((data) => {
    res.json(data); // frontend ko data bhejna
  }).catch((err) => {
    console.error(err);
    res.status(500).send({ error: "Failed to fetch pizza items" });
  });
});

router26.delete('/Burgerdel/:id', (req, res) => {
   const id = req.params.id;
  const db = getDb();

  try {
    const objectId = new ObjectId(id); // 👈 important
    db.collection('Burger')
      .deleteOne({ _id: objectId })
      .then((result) => {
        console.log("Delete result:", result);
        res.send({ status: "Deleted", result });
      })
      .catch((err) => {
        console.error("Delete error:", err);
        res.status(500).send({ error: "Delete failed" });
      });
  } catch (e) {
    console.error("Invalid ObjectId:", id);
    res.status(400).send({ error: "Invalid ID format" });
  }
});

router27.use('/Burgerbck', (req, res, next) => {
  let db = getDb();
  db.collection('Burger').find().toArray().then((response) => {

    if (response) {
      console.log(response);
      res.send({ response: response })
    } else {
      console.log('something error')
    }

  })
})


app.use(router)
app.use(router2)
app.use(router3)
app.use(router4)
app.use(router5)
app.use(router6)
app.use(router7)
app.use(router8)
app.use(router9)
app.use(router10)
app.use(router11)
app.use(router12)
app.use(router13)
app.use(router14)
app.use(router15)
app.use(router16)
app.use(router17)
app.use(router18)
app.use(router19)
app.use(router20)
app.use(router21)
app.use(router22)
app.use(router23)
app.use(router24)
app.use(router25)
app.use(router26)
app.use(router27)


app.get('/', (req, res, next) => {
  res.send('Hello World')
})

mongoconnect(function () {


   server.listen(8100, '0.0.0.0', () => {
  console.log('Server running on port 8100');
});
})

