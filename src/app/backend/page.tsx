"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import Link from "next/link";

/* ── reusable small components ───────────────────────────────── */

function CodeBlock({ children, lang }: { children: string; lang?: string }) {
  return (
    <div className="relative my-4">
      {lang && (
        <span className="absolute top-2 right-3 text-[10px] font-mono uppercase tracking-wider text-gray-400 select-none">
          {lang}
        </span>
      )}
      <pre className="bg-gray-900 text-gray-100 p-5 rounded-xl overflow-x-auto max-h-85 text-sm leading-relaxed shadow-lg scrollbar-thin">
        <code>{children}</code>
      </pre>
    </div>
  );
}

function SectionCard({
  icon,
  title,
  children,
}: {
  icon: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-white rounded-2xl shadow-sm hover:shadow-md border border-gray-100 p-6 md:p-8 mb-6 transition-all duration-300 hover:-translate-y-0.5">
      <h2 className="flex items-center gap-3 text-xl md:text-2xl font-bold text-emerald-600 mb-5">
        <i className={`${icon} text-lg`}></i>
        {title}
      </h2>
      {children}
    </section>
  );
}

function AlertBox({
  children,
  variant = "info",
}: {
  children: React.ReactNode;
  variant?: "info" | "warning" | "success" | "danger";
}) {
  const styles = {
    info: "bg-blue-50 border-blue-200 text-blue-800",
    warning: "bg-amber-50 border-amber-200 text-amber-800",
    success: "bg-emerald-50 border-emerald-200 text-emerald-800",
    danger: "bg-red-50 border-red-200 text-red-800",
  };
  const icons = {
    info: "fas fa-info-circle",
    warning: "fas fa-exclamation-triangle",
    success: "fas fa-check-circle",
    danger: "fas fa-exclamation-circle",
  };
  return (
    <div
      className={`flex items-start gap-3 p-4 rounded-xl border ${styles[variant]} my-4`}
    >
      <i className={`${icons[variant]} mt-0.5`}></i>
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  );
}

/* ── blog content ──────────────────────────────────────────── */

function BackendBlogContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    if (id === "blog-1") {
      document.title =
        "Creating an Email Tracking System with Node.js and Deploying on Vercel";
    }
  }, [id]);

  if (id !== "blog-1") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Blog Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The blog post you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gray-900 text-white font-medium hover:bg-gray-700 transition-colors no-underline"
          >
            ← Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Hero Header ── */}
      <header className="relative bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-teal-600/20 to-cyan-600/20"></div>
        <div className="relative max-w-5xl mx-auto px-6 py-16 md:py-24 text-center">
          <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
            Node.js &middot; Backend &middot; Vercel
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-6">
            Creating an Email Tracking System with Node.js and Deploying on
            Vercel
          </h1>
          <p className="max-w-3xl mx-auto text-gray-300 text-base md:text-lg leading-relaxed">
            Tired of wondering if your emails are read or ignored? Let&apos;s
            build something cool. In this tutorial, we&apos;ll create a simple
            email tracking system using Node.js and Vercel. You&apos;ll learn to
            make an invisible image that reports when an email is opened. Ready?
            Let&apos;s dive in.
          </p>
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 h-16 bg-gray-50"
          style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0)" }}
        ></div>
      </header>

      {/* ── Content ── */}
      <main className="max-w-5xl mx-auto px-6 py-12 space-y-6">
        {/* Understanding How the Code Works */}
        <SectionCard
          icon="fas fa-code"
          title="Understanding How the Code Works"
        >
          <p className="text-gray-700 text-sm mb-4">
            The core of this system is a Node.js Express server that serves a
            1x1 transparent PNG image. When an email containing this image is
            opened, the recipient&apos;s email client sends a request to our
            server. This triggers our tracking mechanism, allowing us to log the
            event and serve the image. Here&apos;s a breakdown of the main
            components:
          </p>
          <ul className="space-y-2 mb-6">
            {[
              "Express server setup",
              "Middleware for logging requests",
              "Route for serving the transparent image",
              "Integration with Vercel Blob for storing logs",
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-sm text-gray-700 bg-gray-50 rounded-lg p-3 border border-gray-100"
              >
                <i className="fas fa-chevron-right text-emerald-500 text-xs"></i>
                {item}
              </li>
            ))}
          </ul>

          <CodeBlock lang="javascript">{`// Import required modules
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
        </SectionCard>

        {/* Step 1: Setting Up the Environment */}
        <SectionCard
          icon="fas fa-cogs"
          title="Step 1: Setting Up the Environment"
        >
          <p className="text-gray-700 text-sm mb-3">
            Before you start coding, ensure that you have Node.js installed on
            your system. If not, you can download it from{" "}
            <a
              href="https://nodejs.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-600 hover:text-emerald-700 underline"
            >
              Node.js
            </a>
            .
          </p>
          <p className="text-gray-700 text-sm mb-3">
            Next, install the necessary packages by running the following
            commands in your terminal:
          </p>
          <CodeBlock lang="bash">{`npm install express`}</CodeBlock>
          <p className="text-gray-700 text-sm mb-2">These packages include:</p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-sm text-gray-700 bg-gray-50 rounded-lg p-3 border border-gray-100">
              <i className="fas fa-check-circle text-emerald-500 mt-0.5"></i>
              <span>
                <strong>Express:</strong> A minimal and flexible Node.js web
                application framework.
              </span>
            </li>
          </ul>
        </SectionCard>

        {/* Step 2: Understanding Jimp Usage */}
        <SectionCard
          icon="fas fa-image"
          title="Step 2: Understanding Jimp Usage"
        >
          <p className="text-gray-700 text-sm mb-4">
            Jimp (JavaScript Image Manipulation Program) is used in this code to
            create a 1x1 transparent PNG image. Here&apos;s how it works:
          </p>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-700 mb-2">
                <span className="font-semibold text-emerald-600">1.</span> Jimp
                is imported at the beginning of the file:
              </p>
              <CodeBlock lang="javascript">{`const Jimp = require('jimp');`}</CodeBlock>
            </div>

            <div>
              <p className="text-sm text-gray-700 mb-2">
                <span className="font-semibold text-emerald-600">2.</span> In
                the route handler for &apos;/image/:filename.png&apos;, Jimp
                creates the image:
              </p>
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
            </div>

            <div className="space-y-2 text-sm text-gray-700">
              <p>
                <span className="font-semibold text-emerald-600">3.</span> The
                image is created with a width and height of 1 pixel, and a fully
                transparent color (0x00000000).
              </p>
              <p>
                <span className="font-semibold text-emerald-600">4.</span> The
                image is then converted to a buffer in PNG format and sent as
                the response.
              </p>
            </div>
          </div>

          <AlertBox variant="success">
            This approach allows us to serve a tiny, invisible image that can be
            used for tracking email opens without affecting the email&apos;s
            appearance.
          </AlertBox>
        </SectionCard>

        {/* Step 3: Deploying the Project on Vercel */}
        <SectionCard
          icon="fas fa-cloud-upload-alt"
          title="Step 3: Deploying the Project on Vercel"
        >
          <p className="text-gray-700 text-sm mb-4">
            Deploying your Node.js application on Vercel is straightforward.
            Here&apos;s the process:
          </p>

          <div className="space-y-5">
            <div>
              <p className="text-sm text-gray-700 mb-2">
                <span className="font-semibold text-emerald-600">1.</span>{" "}
                Create a Vercel account if you don&apos;t have one:{" "}
                <a
                  href="https://vercel.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 hover:text-emerald-700 underline"
                >
                  Vercel
                </a>
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-700 mb-2">
                <span className="font-semibold text-emerald-600">2.</span>{" "}
                Install the Vercel CLI by running the following command in your
                terminal:
              </p>
              <CodeBlock lang="bash">{`npm install -g vercel`}</CodeBlock>
            </div>

            <div>
              <p className="text-sm text-gray-700 mb-2">
                <span className="font-semibold text-emerald-600">3.</span>{" "}
                Configure your project with a{" "}
                <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs text-gray-800">
                  vercel.json
                </code>{" "}
                file to specify build and routing configurations. Here is an
                example:
              </p>
              <CodeBlock lang="json">{`{
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
            </div>

            <div>
              <p className="text-sm text-gray-700 mb-2">
                <span className="font-semibold text-emerald-600">4.</span>{" "}
                Connect your local project with your Vercel account using the
                command:
              </p>
              <CodeBlock lang="bash">{`vercel`}</CodeBlock>
            </div>

            <div>
              <p className="text-sm text-gray-700 mb-2">
                <span className="font-semibold text-emerald-600">5.</span>{" "}
                Upload any changes to Vercel with the command:
              </p>
              <CodeBlock lang="bash">{`vercel --prod`}</CodeBlock>
            </div>
          </div>
        </SectionCard>

        {/* Step 4: Setting Up Vercel Blob */}
        <SectionCard
          icon="fas fa-database"
          title="Step 4: Setting Up Vercel Blob for Storing Logs"
        >
          <p className="text-gray-700 text-sm mb-4">
            To store the logs of when emails are opened, I used Vercel&apos;s
            Blob storage. Here&apos;s how to set it up:
          </p>

          <div className="space-y-5">
            <div>
              <p className="text-sm text-gray-700 mb-2">
                <span className="font-semibold text-emerald-600">1.</span>{" "}
                Install the{" "}
                <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs text-gray-800">
                  @vercel/blob
                </code>{" "}
                package by running the following command in your terminal:
              </p>
              <CodeBlock lang="bash">{`npm install @vercel/blob`}</CodeBlock>
            </div>

            <div>
              <p className="text-sm text-gray-700 mb-2">
                <span className="font-semibold text-emerald-600">2.</span>{" "}
                Configure Vercel Blob in your project settings:
              </p>
              <ul className="space-y-2 ml-4">
                {[
                  "Go to your project in the Vercel dashboard.",
                  'Navigate to the "Storage" section.',
                  "Enable Blob storage for your project.",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-gray-700"
                  >
                    <i className="fas fa-chevron-right text-emerald-500 text-xs"></i>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-sm text-gray-700 mb-2">
                <span className="font-semibold text-emerald-600">3.</span> Use
                the{" "}
                <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs text-gray-800">
                  put
                </code>{" "}
                function from the{" "}
                <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs text-gray-800">
                  @vercel/blob
                </code>{" "}
                package to store logs. Here&apos;s a code snippet demonstrating
                this:
              </p>
              <CodeBlock lang="javascript">{`// Import the 'put' function from Vercel Blob for storing logs
const { put } = require('@vercel/blob');

// Store the log entry in Vercel Blob
await put(\`logs/\${imageName}.txt\`, log, {
  access: 'public',  // Set the access level to public
  addRandomSuffix: false, // Do not add a random suffix to the filename
});`}</CodeBlock>
            </div>

            <div>
              <p className="text-sm text-gray-700">
                <span className="font-semibold text-emerald-600">4.</span>{" "}
                Implement error handling for any failed log writes to ensure
                that your application can handle issues gracefully.
              </p>
            </div>
          </div>
        </SectionCard>

        {/* Step 5: Testing Your Email Tracking Script */}
        <SectionCard
          icon="fas fa-envelope"
          title="Step 5: Testing Your Email Tracking Script"
        >
          <p className="text-gray-700 text-sm mb-4">
            Moving on to testing, we&apos;ll use Gmail to verify your Vercel
            deployment. Follow along:
          </p>

          <div className="space-y-4">
            {[
              'Open Gmail and click on "Compose" to create a new email.',
              "Write your email content as usual.",
              'To insert the tracking image, click on the "Insert photo" icon in the formatting toolbar (it looks like a picture).',
              'In the "Insert photo" dialog, choose "Web address (URL)".',
            ].map((step, i) => (
              <p key={i} className="text-sm text-gray-700">
                <span className="font-semibold text-emerald-600">{i + 1}.</span>{" "}
                {step}
              </p>
            ))}

            <div>
              <p className="text-sm text-gray-700 mb-2">
                <span className="font-semibold text-emerald-600">5.</span> In
                the URL field, paste your Vercel deployment URL followed by the
                endpoint{" "}
                <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs text-gray-800">
                  /image/
                </code>{" "}
                and then add a unique name for the image. For example:
              </p>
              <CodeBlock lang="plaintext">{`https://your-vercel-app.vercel.app/image/uniqueimagename.png`}</CodeBlock>
              <p className="text-sm text-gray-600 ml-4">
                Replace{" "}
                <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">
                  your-vercel-app
                </code>{" "}
                with your actual Vercel app name, and{" "}
                <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">
                  uniqueimagename
                </code>{" "}
                with a name of your choice.
              </p>
            </div>

            {[
              'Click "Insert" to add the invisible tracking image to your email.',
              "Send the email to the intended recipient.",
              "When the recipient opens the email, most email applications automatically try to display all images in the message. This action triggers the email software to retrieve the invisible tracking pixel, which sends a GET request to your Vercel app.",
              "Your app will log this request, storing information about when the email was opened in Vercel Blob storage.",
              "After sending your email, you can monitor your Vercel Blob storage for real-time tracking data. This storage contains logs that record each instance when a recipient opens your email.",
            ].map((step, i) => (
              <p key={i} className="text-sm text-gray-700">
                <span className="font-semibold text-emerald-600">{i + 6}.</span>{" "}
                {step}
              </p>
            ))}
          </div>

          <AlertBox variant="info">
            This tracking method uses an invisible 1x1 PNG image in your email.
            When opened, it silently contacts your server, providing engagement
            data without altering the email&apos;s appearance or alerting
            recipients. This allows accurate measurement of open rates and
            timing while preserving user experience.
          </AlertBox>

          <AlertBox variant="warning">
            <strong>Note:</strong> Remember that this method isn&apos;t 100%
            reliable as some email clients block images by default or give users
            the option to not load images. Additionally, be sure to comply with
            all relevant privacy laws and regulations when implementing email
            tracking.
          </AlertBox>
        </SectionCard>

        {/* Conclusion */}
        <SectionCard icon="fas fa-flag-checkered" title="Conclusion">
          <p className="text-gray-700 text-sm mb-4">
            With these steps, We successfully created and deployed a simple
            email tracking system using Node.js and Vercel. The key to this
            project was understanding how to serve and log image requests, as
            well as effectively deploying the server to Vercel. I hope this
            guide helps you in building your own email tracking systems or
            similar projects!
          </p>
          <div className="bg-teal-50 border border-teal-200 rounded-xl p-5">
            <h4 className="flex items-center gap-2 font-semibold text-teal-800 mb-2">
              <i className="fas fa-rocket"></i> Coming Soon
            </h4>
            <p className="text-sm text-teal-700">
              As an upcoming feature, We plan to add functionality &quot;receive
              SMS notifications on your phone when someone opens your
              email&quot;. This will provide real-time alerts and further
              enhance the tracking capabilities of the system. Stay tuned for
              updates on how this SMS integration will be implemented!
            </p>
          </div>
        </SectionCard>

        {/* Footer */}
        <div className="text-center pt-6 pb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gray-900 text-white font-medium hover:bg-gray-700 transition-all duration-200 no-underline shadow-lg hover:shadow-xl"
          >
            <i className="fas fa-arrow-left text-sm"></i>
            Back to Portfolio
          </Link>
        </div>
      </main>
    </div>
  );
}

export default function BackendBlogPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="animate-pulse text-gray-400">Loading...</div>
        </div>
      }
    >
      <BackendBlogContent />
    </Suspense>
  );
}
