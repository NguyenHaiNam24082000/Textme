require("dotenv").config();
const _ = require("lodash");
const { connectDB } = require("./app/configs/db");
const { generateKeywords } = require("./app/commons/generateKeywords");
const { removeAccents } = require("./app/commons/removeAccents");
const { soundex } = require("./app/commons/soundex");
const SummaryTool = require("node-summary");
// connectDB();

const express = require("express");
const cors = require("cors");
const authRoute = require("./app/routes/authRoute");
const app = express();
const compression = require("compression");
const http = require("http");
const socketio = require("socket.io");
// const os = require("os");

// process.env.UV_THREADPOOL_SIZE = os.cpus().length >= 2 ? 2 : 1;

const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("chatMessage", (msg) => {
    console.log("message: " + msg);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

//Cors
app.use(cors());

//Body Parser
app.use(express.json());

//Compression
app.use(
  compression({
    level: 6,
    threshold: 100 * 1000,
    filter: (req, res) => {
      if (req.headers["x-no-compression"]) {
        return false;
      }
      return compression.filter(req, res);
    },
  })
);

const port = process.env.APP_PORT;

//Fake API

app.get("/api/v1/fake_api/", (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: post,
  });
});
//TODO: fix search more than one word in title. Example: "Hai Nam" cannot search
//search like messenger search
app.get("/api/v1/fake_search/", (req, res, next) => {
  const searchArray = generateKeywords(req.query.search);
  const search = [
    ...searchArray.map((v) => {
      return {
        keyword: v,
        soundex: soundex.calc(v),
      };
    }),
  ];
  const result = post.filter((v) => {
    const title = generateKeywords(v.title).map((r) => {
      return {
        keyword: r,
        soundex: soundex.calc(r),
      };
    });
    const body = generateKeywords(v.body).map((r) => {
      return {
        keyword: r,
        soundex: soundex.calc(r),
      };
    });
    const p = {
      title: {
        keyword: title.map((t) => t.keyword).join(" "),
        soundex: title.map((t) => t.soundex).join(" "),
      },
      body: {
        keyword: body.map((b) => b.keyword).join(" "),
        soundex: body.map((b) => b.soundex).join(" "),
      },
    };
    return search.some((s) => {
      const rs =
        p.title.keyword.includes(s.keyword) ||
        p.body.keyword.includes(s.keyword) ||
        p.title.soundex.includes(s.soundex) ||
        p.body.soundex.includes(s.soundex);
      return rs;
    });
  });
  res.status(200).json({
    status: "success",
    data: result,
    count: result.length,
  });
});

app.get("/api/v1/", (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: "Welcome to Server",
  });
});

//Mount the route
app.use("/api/v1/auth", authRoute);

// app.use("/", ()=>{
//   console.log("Server is running");
// });

server.listen(port, () => console.log(`Listening on port ${port}`));

// var title =
//   "Swayy is a beautiful new dashboard for discovering and curating online content [Invites]";
// var content = "";
// content +=
//   "Lior Degani, the Co-Founder and head of Marketing of Swayy, pinged me last week when I was in California to tell me about his startup and give me beta access. I heard his pitch and was skeptical. I was also tired, cranky and missing my kids – so my frame of mind wasn't the most positive.\n";
// content +=
//   'I went into Swayy to check it out, and when it asked for access to my Twitter and permission to tweet from my account, all I could think was, "If this thing spams my Twitter account I am going to bitch-slap him all over the Internet." Fortunately that thought stayed in my head, and not out of my mouth.\n';
// content +=
//   "One week later, I'm totally addicted to Swayy and glad I said nothing about the spam (it doesn't send out spam tweets but I liked the line too much to not use it for this article). I pinged Lior on Facebook with a request for a beta access code for TNW readers. I also asked how soon can I write about it. It's that good. Seriously. I use every content curation service online. It really is That Good.\n";
// content +=
//   "What is Swayy? It's like Percolate and LinkedIn recommended articles, mixed with trending keywords for the topics you find interesting, combined with an analytics dashboard that shows the trends of what you do and how people react to it. I like it for the simplicity and accuracy of the content curation.\n";
// content +=
//   "Everything I'm actually interested in reading is in one place – I don't have to skip from another major tech blog over to Harvard Business Review then hop over to another major tech or business blog. It's all in there. And it has saved me So Much Time\n\n";
// content +=
//   "After I decided that I trusted the service, I added my Facebook and LinkedIn accounts. The content just got That Much Better. I can share from the service itself, but I generally prefer reading the actual post first – so I end up sharing it from the main link, using Swayy more as a service for discovery.\n";
// content +=
//   "I'm also finding myself checking out trending keywords more often (more often than never, which is how often I do it on Twitter.com).\n\n\n";
// content +=
//   "The analytics side isn't as interesting for me right now, but that could be due to the fact that I've barely been online since I came back from the US last weekend. The graphs also haven't given me any particularly special insights as I can't see which post got the actual feedback on the graph side (however there are numbers on the Timeline side.) This is a Beta though, and new features are being added and improved daily. I'm sure this is on the list. As they say, if you aren't launching with something you're embarrassed by, you've waited too long to launch.\n";
// content +=
//   "It was the suggested content that impressed me the most. The articles really are spot on – which is why I pinged Lior again to ask a few questions:\n";
// content +=
//   "How do you choose the articles listed on the site? Is there an algorithm involved? And is there any IP?\n";
// content +=
//   "Yes, we're in the process of filing a patent for it. But basically the system works with a Natural Language Processing Engine. Actually, there are several parts for the content matching, but besides analyzing what topics the articles are talking about, we have machine learning algorithms that match you to the relevant suggested stuff. For example, if you shared an article about Zuck that got a good reaction from your followers, we might offer you another one about Kevin Systrom (just a simple example).\n";
// content +=
//   "Who came up with the idea for Swayy, and why? And what's your business model?\n";
// content +=
//   "Our business model is a subscription model for extra social accounts (extra Facebook / Twitter, etc) and team collaboration.\n";
// content +=
//   "The idea was born from our day-to-day need to be active on social media, look for the best content to share with our followers, grow them, and measure what content works best.\n";
// content += "Who is on the team?\n";
// content +=
//   "Ohad Frankfurt is the CEO, Shlomi Babluki is the CTO and Oz Katz does Product and Engineering, and I [Lior Degani] do Marketing. The four of us are the founders. Oz and I were in 8200 [an elite Israeli army unit] together. Emily Engelson does Community Management and Graphic Design.\n";
// content +=
//   "If you use Percolate or read LinkedIn's recommended posts I think you'll love Swayy.\n";
// content +=
//   "Want to try Swayy out without having to wait? Go to this secret URL and enter the promotion code thenextweb . The first 300 people to use the code will get access.\n";
// content += "Image credit: Thinkstock";

// content = `Điều này có nghĩa là họ phải học tiếng Anh, tập làm quen với nền văn hóa khác và đi một đoạn đường dài 800km mỗi tuần để tham dự các buổi nhóm họp.`;

// SummaryTool.summarize(title, content, function (err, summary) {
//   if (err) return console.log("Something went wrong man!");

//   console.log(summary);

//   console.log("Original Length " + (title.length + content.length));
//   console.log("Summary Length " + summary.length);
//   console.log(
//     "Summary Ratio: " +
//       (100 - 100 * (summary.length / (title.length + content.length)))
//   );
// });
