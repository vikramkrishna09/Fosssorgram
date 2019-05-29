let express = require("express");
let graphqlHTTP = require("express-graphql");
let { buildSchema } = require("graphql");
let cors = require("cors");
let Pusher = require("pusher");
let bodyParser = require("body-parser");
let Multipart = require("connect-multiparty");






var listofaccountnames = []
listofaccountnames.push("angie");
listofaccountnames.push("a");
// Construct a schema, using GraphQL schema language
let schema = buildSchema(`
  type User {
    id : String
    nickname : String!
    avatar : String!
  }

  type Post {
      id: String
      user: User!
      caption : String!
      image : String!
  }

  type Query{
    user(id: String) : User!
    post(user_id: String, post_id: String) : Post!
    posts(user_id: String) : [Post]
    getallposts : [Post]


  }

`);

// Maps id to User object
let userslist = {
  a: {
    id: "a",
    nickname: "Chris",
    avatar: "https://www.laravelnigeria.com/img/chris.jpg"
  },
  b: {
    id: "b",
    nickname: "OG",
    avatar:
      "http://res.cloudinary.com/og-tech/image/upload/q_40/v1506850315/contact_tzltnn.jpg"
  },

  angie:
    {
      id: "angie",
      nickname: "slut",
      avatar: "https://scontent-lga3-1.cdninstagram.com/vp/e6ca131f0cffce82eb590b859e4a9d41/5CEFD3B6/t51.2885-19/s150x150/51669859_601265990386844_4039355010323054592_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com"
    },

   Jonsnow:
{
    id: "Jonsnow",
    nickname: "",
    avatar: ""

},

  jamieL:
  {
    id: "jamieL",
    nickname: "",
    avatar: ""
  }



};

let postslist = {
  a: {
    a: {
      id: "a",
      user: userslist["a"],
      caption: "Moving the community!",
      image: "https://pbs.twimg.com/media/DOXI0IEXkAAkokm.jpg"
    },
    b: {
      id: "b",
      user: userslist["a"],
      caption: "Angular Book :",
      image:
        "https://cdn-images-1.medium.com/max/1000/1*ltLfTw87lE-Dqt-BKNdj1A.jpeg"
    },
    c: {
      id: "c",
      user: userslist["a"],
      caption: "#ABC",
      image: "https://pbs.twimg.com/media/DNNhrp6W0AAbk7Y.jpg:large"
    },
    d: {
      id: "d",
      user: userslist["a"],
      caption: "Moving the community!",
      image: "https://pbs.twimg.com/media/DOXI0IEXkAAkokm.jpg"
    },

    e: {
      id: "e",
      user: userslist["a"],
      caption: "#ABC",
      image: "https://pbs.twimg.com/media/DOXI0IEXkAAkokm.jpg"
    },


    f: {
      id: "f",
      user: userslist["b"],
      caption: "#ABC",
      image:         "https://cdn-images-1.medium.com/max/1000/1*ltLfTw87lE-Dqt-BKNdj1A.jpeg"

    }
  },

  angie:
    {
      angie_a:
      {
        id: "angie_a",
        user: userslist["angie"],
        caption:"#ABC",
        image:"https://scontent-lga3-1.cdninstagram.com/vp/24d693575a0e369f7c00c40d4d23409a/5D033935/t51.2885-15/e35/p1080x1080/51245534_141415110226950_5726619775225040628_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com"
      },

      angie_b:
      {
        id: "angie_b",
        user: userslist["angie"],

        caption: "#ABC",
        image: "https://scontent-lga3-1.cdninstagram.com/vp/35ea61a37af6537d6a55fe053a14ae73/5D0A20B6/t51.2885-15/e35/p1080x1080/50673641_126531435066492_4178484485866133692_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com"
      },

      angie_c:
      {
        id: "angie_c",
        user: userslist["angie"],

        caption: "",
        image: "https://scontent-lga3-1.cdninstagram.com/vp/746994f52032ac0a7109e97a8a11416a/5D070203/t51.2885-15/e35/p1080x1080/51725335_492683447802223_6779462173491898069_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com"
      },

      angie_d:
      {
        id: "angie_d",
        user: userslist["angie"],

        caption: "",
        image: "https://scontent-lga3-1.cdninstagram.com/vp/a96b345cb577d64cba96794b48fe6774/5CED64D3/t51.2885-15/e35/p1080x1080/51441858_2022009628101985_865751094596859324_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com"
      },

      angie_e:
      {
        id: "angie_e",
        user: userslist["angie"],

        caption: "#ABC",
        image: "https://scontent-lga3-1.cdninstagram.com/vp/5610c02985b00e4d728ab4d706d24917/5CF0F167/t51.2885-15/e35/p1080x1080/50642805_289246785102669_6468687410657411496_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com"
      },

      angie_f:
      {
        id: "f",
        user: userslist["angie"],
        caption: "#ABC",
        image:"https://scontent-lga3-1.cdninstagram.com/vp/c1ac2427fa074032270e2a153cf1590a/5D1AB235/t51.2885-15/e35/p1080x1080/52666893_130359748020394_3935894017182643101_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com"
      }

    },

    jamieL:
    {

        jamieL_a:
        {
          id: "jamieL_a",
          user: userslist["jamieL"],

          caption: "#BCD",
          image: "https://scontent-lga3-1.cdninstagram.com/vp/5db3182c8a434b85324b497e48d3a87b/5D58951E/t51.2885-15/e35/s1080x1080/60346654_363404064308190_4134060278003807786_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com"
        },

        jamieL_b:
        {
          id: "jamieL_b",
          user: userslist["jamieL"],

          caption: "#BCD",
          image: "https://scontent-lga3-1.cdninstagram.com/vp/44a72bbe42ef259fa15897ad7626a5d6/5D633783/t51.2885-15/e35/s1080x1080/59853257_192599958373654_1938461327539533133_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com"
        },

        jamieL_c:
        {
          id: "jamieL_c",
          user: userslist["jamieL"],

          caption: "",
          image: "https://scontent-lga3-1.cdninstagram.com/vp/77d9233e1834d111221088945aabc6b5/5CE14EF2/t51.2885-15/e35/58722675_426725414844094_7549198409826065305_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com"
        },

        jamieL_d:
        {
          id: "jamieL_d",
          user: userslist["jamieL"],

          caption: "#BCD",
          image: "https://scontent-lga3-1.cdninstagram.com/vp/8c2033d613a983766d8fb67f90d89742/5D6AFD67/t51.2885-15/e35/59410992_657585228020040_6132218599274467521_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com"
        },

        jamieL_e:
        {
          id: "jamieL_e",
          user: userslist["jamieL"],

          caption: "",
          image: "https://scontent-lga3-1.cdninstagram.com/vp/01d5cf89626b7de5f421769a01e34954/5D570745/t51.2885-15/e35/p1080x1080/59616762_352158552106778_493745860846290857_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com"
        },

        jamieL_f:
        {
          id: "jamieL_f",
          user: userslist["jamieL"],

          caption: "#BCD",
          image: "https://scontent-lga3-1.cdninstagram.com/vp/0ee195de638e119f3662be9585c7852b/5CE125D3/t51.2885-15/e15/58818500_305721596991570_3981369625541029269_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com"
        },

        jamieL_g:
        {
          id: "jamieL_g",
          user: userslist["jamieL"],

          caption: "",
          image: "https://scontent-lga3-1.cdninstagram.com/vp/1a08f74f1783a7b50dc64cea08983ea3/5CE10804/t51.2885-15/e35/57029200_456327841772689_2752286373002645_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com"
        }


    },

    Jonsnow:
    {
      Jonsnow_a:
      {
        id: "Jonsnow_a",
        user: userslist["Jonsnow"],

        caption: "#BCD",
        image: "https://scontent-lga3-1.cdninstagram.com/vp/f73844f41ef69aa9845cf96d7634e3bd/5D79F485/t51.2885-15/e35/58622806_332206080824711_5355848741592218694_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com"
      },

      Jonsnow_b:
      {
        id: "Jonsnow_b",
        user: userslist["Jonsnow"],

        caption: "#BCD",
        image: "https://scontent-lga3-1.cdninstagram.com/vp/52b01fbbf553e951b6047324bc47e457/5D5D0728/t51.2885-15/e35/60020457_347983902760355_5292525712988101665_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com"
      },

      Jonsnow_c:
      {
        id: "Jonsnow_c",
        user: userslist["Jonsnow"],

        caption: "#BCD",
        image: "https://scontent-lga3-1.cdninstagram.com/vp/7078417eeb6be93e260a66b4c72f05b9/5D71A2F1/t51.2885-15/e35/60010947_101284101081293_5481324694902901966_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com"
      },

      Jonsnow_d:
      {
        id: "Jonsnow_d",
        user: userslist["Jonsnow"],

        caption: "#BCD",
        image: "https://scontent-lga3-1.cdninstagram.com/vp/e1daf469ab0df296b1eb2a5ae7236d2c/5D7258BE/t51.2885-15/e35/58689496_347212865998122_634139421326713111_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com"
      }
    }

};





// The root provides a resolver function for each API endpoint
let root = {
  user: function({ id }) {
    return userslist[id];
  },
  post: function({ user_id, post_id }) {
    return postslist[user_id][post_id];
  },
  posts: function({ user_id }) {
    return Object.values(postslist[user_id]);
  },

  getallposts: function()
  {
    var i;
    var u = [];
    var y = [];
    for(i = 0; i < listofaccountnames.length;i++)
    {
        y = Object.values(postslist[listofaccountnames[i]]);
        console.log(i)
        u = u.concat(y);
  }
    return (Object.values(u));

  }
  ,
  getallposts_with_this_caption: function({post_caption})
  {
    var i;
    var u = [];
    var y = [];
    for(i = 0; i < listofaccountnames.length;i++)
    {
        y = Object.values(postslist[listofaccountnames[i]]);
        if(y[1] == post_caption || y[0] == post_caption || y[2] == post_caption || y[4] == post_caption)
        {
        u = u.concat(y);
      }
        else
        {
        continue;
      }
  }
    return (u);

  }
};

// Configure Pusher client
let pusher = new Pusher({
  appId: "700473",
  key: "cc08c051a801a57d5b83",
  secret: "f2e181ca37e73d518b6a",
  cluster: "us2",
  encrypted: true
});

// create express app
let app = express();
app.use(cors());
app.use(bodyParser.json());

let multipartMiddleware = new Multipart();

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);

// trigger add a new post
app.post('/newpost', multipartMiddleware, (req,res) => {
  // create a sample post
  let post = {
    user : {
      nickname : req.body.name,
      avatar : req.body.avatar
    },
    image : req.body.image,
    caption : req.body.caption
  }

  // trigger pusher event
  pusher.trigger("posts-channel", "new-post", {
    post
  });

  return res.json({status : "Post created"});
});


app.listen(4000);
console.log("Running a GraphQL API server at localhost:4000/graphql");
