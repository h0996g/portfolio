"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import ArticleLayout, {
  ArticleLoading,
  ArticleNotFound,
} from "@/components/blog/ArticleLayout";
import CodeBlock from "@/components/blog/CodeBlock";
import { A, H2, InlineCode, Note, Ol, P, Ul } from "@/components/blog/prose";

const TITLE =
  "Creating an Email Tracking System with Node.js and Deploying on Vercel";

/* ── blog content ──────────────────────────────────────────── */

function BackendBlogContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    if (id === "blog-1") {
      document.title = TITLE;
    }
  }, [id]);

  if (id !== "blog-1") {
    return <ArticleNotFound />;
  }

  return (
    <ArticleLayout
      tag="Node.js · Express · Vercel"
      title={TITLE}
      lede="Ever sent an important email and wondered if anyone actually opened it? In this post I'll build a small email tracker with Node.js and deploy it on Vercel. The trick is an invisible image that tells your server when the email is opened."
      readTime="6 min read"
      currentHref="/backend?id=blog-1"
    >
      <H2>How it works</H2>
      <P>
        The whole thing is a tiny Express server that returns a 1×1
        transparent PNG. You put a link to that image in an email. When the
        recipient opens it, their email client asks your server for the image,
        and that request is the signal: the server logs when it happened, then
        sends the pixel back so nothing looks off.
      </P>
      <P>The server has four parts:</P>
      <Ul>
        <li>the Express server setup</li>
        <li>a middleware that logs every request</li>
        <li>a route that serves the transparent image</li>
        <li>Vercel Blob, to store the logs</li>
      </Ul>
      <P>Here&apos;s the full code. I&apos;ll go through each part below.</P>

      <CodeBlock filename="app.js">{`// Import required modules
const app = require('express')(); // Create an Express application
const { put } = require('@vercel/blob'); // Import the 'put' function from Vercel Blob for storing logs
const Jimp = require('jimp'); // Import Jimp for image manipulation
const path = require('path'); // Import path module for file path operations

// Enable trust proxy to get the correct IP address when behind a reverse proxy
app.set('trust proxy', true);

// Set the port for the server to listen on
const PORT = process.env.PORT || 3000;

// Middleware to log requests and store them in Vercel Blob
app.use(async (req, res, next) => {
  const now = new Date(); // Get the current date and time
  const imageName = path.parse(req.path).name; // Extract the filename (without extension) from the request path

  const ip = req.ip; // Get the IP address of the client
  const log = \`\${now.toISOString()} - \${imageName} - IP: \${ip}\`; // Create a log entry

  try {
    // Store the log entry in Vercel Blob under the 'gmail' directory
    await put(\`gmail/\${imageName}.txt\`, log, {
      access: 'public', // Make the log file publicly accessible
      addRandomSuffix: false, // Do not add a random suffix to the filename
    });
  } catch (error) {
    console.error("Error writing log to Vercel Blob:", error); // Log any errors that occur while writing the log
  }
  next(); // Continue to the next middleware or route handler
});

// Route to respond with a simple "Hello" message
app.get('/', (req, res) => {
  res.send('Hello');
});

// Route to serve a 1x1 transparent PNG image
app.get('/image/:filename.png', (req, res) => {
  const width = 1;
  const height = 1;

  // Create a new 1x1 transparent image using Jimp
  new Jimp(width, height, 0x00000000, (err, image) => {
    if (err) {
      console.error("Error creating image:", err);
      return res.status(500).send("Error creating image");
    }
    // Convert the image to a buffer and send it as the response
    image.getBuffer(Jimp.MIME_PNG, (err, buffer) => {
      if (err) {
        console.error("Error getting image buffer:", err);
        return res.status(500).send("Error processing image");
      }
      res.set('Content-Type', 'image/png'); // Set the response content type to PNG
      res.send(buffer); // Send the image buffer as the response
    });
  });
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(\`Server started on port \${PORT}\`);
});`}</CodeBlock>

      <H2>1. Set up the project</H2>
      <P>
        You&apos;ll need Node.js installed. If you don&apos;t have it yet, you
        can download it from <A href="https://nodejs.org/">nodejs.org</A>.
      </P>
      <P>Then install the two packages the server uses:</P>
      <CodeBlock lang="bash">{`npm install express jimp@0.22`}</CodeBlock>
      <P>
        Express is the web framework, and Jimp is what we&apos;ll use to draw
        the pixel. I pinned Jimp to 0.22 because the code uses its older
        callback API, which changed in version 1.0.
      </P>

      <H2>2. Generating the invisible image with Jimp</H2>
      <P>
        Jimp (JavaScript Image Manipulation Program) creates the 1×1 PNG on
        the fly. It&apos;s imported at the top of the file:
      </P>
      <CodeBlock lang="javascript">{`const Jimp = require('jimp');`}</CodeBlock>
      <P>
        Then, inside the <InlineCode>/image/:filename.png</InlineCode> route,
        it creates the image:
      </P>
      <CodeBlock lang="javascript">{`// Create a new 1x1 transparent image using Jimp
new Jimp(width, height, 0x00000000, (err, image) => {
  // Error handling if image creation fails
  if (err) {
    console.error("Error creating image:", err);
    return res.status(500).send("Error creating image");
  }

  // Convert the image to a PNG buffer
  image.getBuffer(Jimp.MIME_PNG, (err, buffer) => {
    // Error handling if buffer creation fails
    if (err) {
      console.error("Error getting image buffer:", err);
      return res.status(500).send("Error processing image");
    }

    // Set the content type of the response to PNG
    res.set('Content-Type', 'image/png');

    // Send the PNG buffer as the response
    res.send(buffer);
  });
});`}</CodeBlock>
      <P>
        The image is 1 pixel wide and 1 pixel high, and the color{" "}
        <InlineCode>0x00000000</InlineCode> is fully transparent. Jimp turns it
        into a PNG buffer, and we send that back with the{" "}
        <InlineCode>image/png</InlineCode> content type. The recipient never
        sees anything, and the email looks exactly the same.
      </P>

      <H2>3. Deploy to Vercel</H2>
      <P>Deploying a Node.js app on Vercel only takes a few commands:</P>
      <Ol>
        <li>
          Create a <A href="https://vercel.com/">Vercel</A> account if you
          don&apos;t have one.
        </li>
        <li>
          Install the Vercel CLI:
          <CodeBlock lang="bash">{`npm install -g vercel`}</CodeBlock>
        </li>
        <li>
          Add a <InlineCode>vercel.json</InlineCode> file so Vercel knows how
          to build and route the app. Here&apos;s mine:
          <CodeBlock filename="vercel.json">{`{
  "version": 2,
  "builds": [
    {
      "src": "./app.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/app.js"
    }
  ]
}`}</CodeBlock>
        </li>
        <li>
          Link the project to your Vercel account:
          <CodeBlock lang="bash">{`vercel`}</CodeBlock>
        </li>
        <li>
          Deploy to production, and run the same command again whenever you
          make changes:
          <CodeBlock lang="bash">{`vercel --prod`}</CodeBlock>
        </li>
      </Ol>

      <H2>4. Store the logs in Vercel Blob</H2>
      <P>
        To keep a record of every open, I used Vercel&apos;s Blob storage.
        Here&apos;s how to set it up:
      </P>
      <Ol>
        <li>
          Install the package:
          <CodeBlock lang="bash">{`npm install @vercel/blob`}</CodeBlock>
        </li>
        <li>
          In the Vercel dashboard, open your project, go to the Storage tab
          and enable Blob storage.
        </li>
        <li>
          Use the <InlineCode>put</InlineCode> function from{" "}
          <InlineCode>@vercel/blob</InlineCode> to write each log entry:
          <CodeBlock lang="javascript">{`// Import the 'put' function from Vercel Blob for storing logs
const { put } = require('@vercel/blob');

// Store the log entry in Vercel Blob
await put(\`logs/\${imageName}.txt\`, log, {
  access: 'public',  // Set the access level to public
  addRandomSuffix: false, // Do not add a random suffix to the filename
});`}</CodeBlock>
        </li>
        <li>
          Wrap the write in a <InlineCode>try/catch</InlineCode>, like in the
          full code above, so a failed write doesn&apos;t break the image
          response.
        </li>
      </Ol>

      <H2>5. Try it with Gmail</H2>
      <P>Now the fun part. I tested it with Gmail:</P>
      <Ol>
        <li>Open Gmail and click Compose.</li>
        <li>Write your email as usual.</li>
        <li>
          Click the Insert photo icon in the formatting toolbar (it looks like
          a picture).
        </li>
        <li>In the dialog, choose Web address (URL).</li>
        <li>
          Paste your Vercel URL, followed by <InlineCode>/image/</InlineCode>{" "}
          and a unique name for the image. For example:
          <CodeBlock lang="plaintext">{`https://your-vercel-app.vercel.app/image/uniqueimagename.png`}</CodeBlock>
          Replace <InlineCode>your-vercel-app</InlineCode> with your app&apos;s
          name, and <InlineCode>uniqueimagename</InlineCode> with any name you
          like.
        </li>
        <li>Click Insert, then send the email.</li>
      </Ol>
      <P>
        When the recipient opens the email, most email apps load the images
        automatically. That includes our invisible pixel, so their email app
        sends a GET request to your Vercel app, and the middleware writes a log
        entry to Blob storage. Check your Blob storage in the Vercel dashboard
        and you&apos;ll see when each email was opened.
      </P>

      <Note label="A word of caution:">
        This isn&apos;t 100% reliable. Some email clients block images by
        default, and some let users choose not to load them. Also, make sure
        you follow the privacy laws that apply to you before tracking
        anyone&apos;s emails.
      </Note>

      <H2>Wrapping up</H2>
      <P>
        That&apos;s it: a small email tracker built with Node.js and deployed on
        Vercel. The key idea is that serving an image lets you log a request.
        Once that clicks, the rest is just deployment. I hope this helps you
        build your own tracker, or something similar.
      </P>
      <P>
        Next, I want to add SMS notifications, so I get a text on my phone the
        moment someone opens my email. I&apos;ll write a follow-up when
        it&apos;s ready.
      </P>
    </ArticleLayout>
  );
}

export default function BackendBlogPage() {
  return (
    <Suspense fallback={<ArticleLoading />}>
      <BackendBlogContent />
    </Suspense>
  );
}
