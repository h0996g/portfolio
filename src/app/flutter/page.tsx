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
  badge,
  link,
}: {
  icon: string;
  title: string;
  children: React.ReactNode;
  badge?: { text: string; href: string; icon: string };
  link?: never;
}) {
  return (
    <section className="bg-white rounded-2xl shadow-sm hover:shadow-md border border-gray-100 p-6 md:p-8 mb-6 transition-all duration-300 hover:-translate-y-0.5">
      <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
        <h2 className="flex items-center gap-3 text-xl md:text-2xl font-bold text-emerald-600">
          <i className={`${icon} text-lg`}></i>
          {title}
        </h2>
        {badge && (
          <a
            href={badge.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors no-underline"
          >
            <i className={badge.icon}></i> {badge.text}
          </a>
        )}
      </div>
      {children}
    </section>
  );
}

function InfoCard({
  title,
  children,
  variant = "blue",
}: {
  title: string;
  children: React.ReactNode;
  variant?: "blue" | "green" | "red" | "yellow" | "purple";
}) {
  const colors = {
    blue: "border-blue-200 bg-blue-50/50",
    green: "border-emerald-200 bg-emerald-50/50",
    red: "border-red-200 bg-red-50/50",
    yellow: "border-amber-200 bg-amber-50/50",
    purple: "border-purple-200 bg-purple-50/50",
  };
  const headerColors = {
    blue: "bg-blue-600",
    green: "bg-emerald-600",
    red: "bg-red-600",
    yellow: "bg-amber-600",
    purple: "bg-purple-600",
  };
  return (
    <div
      className={`rounded-xl border ${colors[variant]} overflow-hidden h-full`}
    >
      <div
        className={`${headerColors[variant]} text-white px-4 py-2.5 text-sm font-semibold`}
      >
        {title}
      </div>
      <div className="p-4 text-sm text-gray-700">{children}</div>
    </div>
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

function FlutterBlogContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    if (id === "blog-1") {
      document.title =
        "Flutter BlocProvider: Best Practices and Common Pitfalls";
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
        <div className="absolute inset-0 bg-linear-to-br from-emerald-600/20 to-blue-600/20"></div>
        <div className="relative max-w-5xl mx-auto px-6 py-16 md:py-24 text-center">
          <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            Flutter &middot; State Management
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-6">
            Flutter BlocProvider: Understanding Context and Performance
          </h1>
          <p className="max-w-3xl mx-auto text-gray-300 text-base md:text-lg leading-relaxed">
            Through my experience with Flutter state management, I&apos;ve
            learned valuable lessons about Bloc, Cubit, and particularly
            MultiBlocProvider implementations — often through practical
            challenges in real projects. While MultiBlocProvider appears
            straightforward at first, understanding its proper usage can make a
            real difference in your app&apos;s performance and maintainability.
            I&apos;d like to share these insights to help you build better
            applications while avoiding some common pitfalls I&apos;ve
            encountered along the way.
          </p>
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 h-16 bg-gray-50"
          style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0)" }}
        ></div>
      </header>

      {/* ── Content ── */}
      <main className="max-w-5xl mx-auto px-6 py-12 space-y-6">
        {/* Why This Tutorial Exists */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-6">
          <h2 className="flex items-center gap-3 text-xl md:text-2xl font-bold text-emerald-600 mb-5">
            <i className="fas fa-pen-fancy text-lg"></i>
            Why This Tutorial Exists
          </h2>
          <div className="bg-gray-50 rounded-xl p-5 mb-6 border-l-4 border-emerald-500">
            <p className="text-gray-700 leading-relaxed italic">
              <i className="fas fa-quote-left text-gray-300 mr-2"></i>
              This tutorial aims to share some insights about BlocProvider
              implementation patterns in Flutter. Through community discussions
              and shared experiences on platforms like Stack Overflow, I noticed
              some common challenges developers face when implementing state
              management with BLoC. Let&apos;s explore together some effective
              approaches and best practices that can help create more
              maintainable Flutter applications.
            </p>
          </div>

          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Key Motivations:
          </h3>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <InfoCard title="🚨 The Problem" variant="red">
              <p>
                A Stack Overflow answer with 36 upvotes was promoting a global
                BlocProvider pattern that could lead to serious performance
                issues and memory leaks.
              </p>
            </InfoCard>
            <InfoCard title="🎯 The Goal" variant="green">
              <p>
                To provide clear, practical guidance on proper bloc
                implementation, backed by insights from the bloc library creator
                himself.
              </p>
            </InfoCard>
            <InfoCard title="👥 The Impact" variant="blue">
              <p>
                Help developers avoid common pitfalls and build more
                maintainable, performant Flutter applications.
              </p>
            </InfoCard>
          </div>

          <h3 className="text-lg font-bold text-gray-900 mb-4">
            What You&apos;ll Learn:
          </h3>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <ul className="space-y-2">
              {[
                "Proper BlocProvider implementation patterns",
                "Common pitfalls and how to avoid them",
                "Performance implications of different approaches",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-gray-700 bg-gray-50 rounded-lg p-3"
                >
                  <i className="fas fa-check-circle text-emerald-500 mt-0.5"></i>
                  {item}
                </li>
              ))}
            </ul>
            <ul className="space-y-2">
              {[
                "Best practices for state management",
                "Real-world examples and solutions",
                "Insights from the bloc library creator",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-gray-700 bg-gray-50 rounded-lg p-3"
                >
                  <i className="fas fa-check-circle text-emerald-500 mt-0.5"></i>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <AlertBox variant="info">
            <p className="font-semibold mb-1">Prerequisites</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Basic understanding of Flutter development</li>
              <li>Familiarity with the BLoC pattern concept</li>
              <li>Flutter development environment set up</li>
            </ul>
          </AlertBox>
        </section>

        {/* Common BlocProvider Issues */}
        <SectionCard
          icon="fas fa-question-circle"
          title="Common BlocProvider Issues"
          badge={{
            text: "View Original Discussion",
            href: "https://stackoverflow.com/questions/59902356/blocprovider-of-called-with-a-context-that-does-not-contain-a-bloc-even-that/",
            icon: "fab fa-stack-overflow",
          }}
        >
          <div className="bg-amber-50/50 border border-amber-200 rounded-xl p-5 mb-5">
            <span className="inline-block px-2.5 py-1 text-xs font-semibold rounded-md bg-amber-200 text-amber-800 mb-3">
              Stack Overflow Question
            </span>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Understanding Context Issues with BlocProvider
            </h3>
            <p className="text-sm text-gray-600">
              <i className="fas fa-exclamation-circle text-amber-500 mr-1"></i>
              Common Error: &quot;BlocProvider.of() called with a context that
              does not contain a Bloc&quot;
            </p>
          </div>

          <h4 className="font-semibold text-gray-900 mb-3">Typical Scenario</h4>
          <p className="text-gray-700 text-sm mb-3">
            Consider a common Flutter application structure with authentication
            flow:
          </p>
          <CodeBlock lang="plaintext">{`App() => LoginPage() => HomePage() => UserTokensPage()`}</CodeBlock>

          <AlertBox variant="info">
            Many developers start with this seemingly correct implementation:
          </AlertBox>

          <h4 className="font-semibold text-gray-900 mb-3">
            Initial Implementation
          </h4>
          <CodeBlock lang="dart">{`void main() => runApp(App());

class App extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'My App',
      home: BlocProvider<UserBloc>(
        create: (context) => UserBloc(UserRepository()),
        child: LoginPage(),
      ),
    );
  }
}`}</CodeBlock>

          <AlertBox variant="warning">
            This implementation can lead to context-related issues when
            navigating between pages
          </AlertBox>

          <h4 className="font-semibold text-gray-900 mb-3">
            Why This Can Be Problematic:
          </h4>
          <ul className="space-y-2 mb-4">
            {[
              "Bloc access lost during navigation",
              "Context scope limited to LoginPage",
              "State management becomes inconsistent",
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-sm text-gray-700 bg-red-50 rounded-lg p-3 border border-red-100"
              >
                <i className="fas fa-times-circle text-red-500"></i>
                {item}
              </li>
            ))}
          </ul>
        </SectionCard>

        {/* The Misleading Solution */}
        <SectionCard
          icon="fas fa-exclamation-triangle"
          title="The Misleading Solution"
          badge={{
            text: "View Original Discussion",
            href: "https://stackoverflow.com/questions/59902356/blocprovider-of-called-with-a-context-that-does-not-contain-a-bloc-even-that/60316681#60316681",
            icon: "fab fa-stack-overflow",
          }}
        >
          <AlertBox variant="danger">
            Warning: This approach can lead to performance issues
          </AlertBox>

          <p className="text-gray-700 text-sm mb-3">
            A highly upvoted answer suggested wrapping the entire app with
            MultiBlocProvider:
          </p>
          <CodeBlock lang="dart">{`void main() {
  runApp(
    MultiBlocProvider(
      providers: [
        BlocProvider<UserBloc>(
          create: (context) => UserBloc(UserRepository()),
        ),
        // More global providers...
      ],
      child: App()
    )
  );
}`}</CodeBlock>

          <h4 className="font-semibold text-gray-900 mb-4">
            Why This Solution Is Problematic:
          </h4>
          <div className="grid md:grid-cols-2 gap-4">
            <InfoCard title="Memory Issues" variant="red">
              <ul className="list-disc list-inside space-y-1">
                <li>Blocs are never disposed</li>
                <li>Resources are consumed unnecessarily</li>
                <li>Memory leaks can occur</li>
              </ul>
            </InfoCard>
            <InfoCard title="State Management Issues" variant="red">
              <ul className="list-disc list-inside space-y-1">
                <li>Global state becomes complex</li>
                <li>Requires manual state resets</li>
                <li>Poor feature isolation</li>
              </ul>
            </InfoCard>
          </div>
        </SectionCard>

        {/* The Verified Solution */}
        <SectionCard
          icon="fas fa-check-circle"
          title="The Verified Solution"
          badge={{
            text: "View Original Discussion",
            href: "https://stackoverflow.com/questions/59902356/blocprovider-of-called-with-a-context-that-does-not-contain-a-bloc-even-that/59970345#59970345",
            icon: "fab fa-stack-overflow",
          }}
        >
          <AlertBox variant="info">
            While a correct solution was provided and verified with a checkmark,
            it didn&apos;t address or correct the misleading approach suggested
            in the other answer. This missed opportunity to warn developers
            about the potential issues with the global BlocProvider
            implementation.
          </AlertBox>
        </SectionCard>

        {/* Insights from the Creator */}
        <SectionCard
          icon="fas fa-lightbulb"
          title="Insights from the Creator"
          badge={{
            text: "View GitHub Issue",
            href: "https://github.com/felangel/bloc/issues/3272/",
            icon: "fab fa-github",
          }}
        >
          <div className="bg-emerald-50/50 border-l-4 border-emerald-500 rounded-r-xl p-5 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-emerald-200 text-emerald-800">
                Felix Angelov (bloc library creator)
              </span>
              <span className="text-xs text-gray-500">March 10, 2022</span>
            </div>
            <blockquote className="text-gray-700 text-sm leading-relaxed">
              <p className="mb-3">
                The main disadvantages of providing all blocs globally are:
              </p>
              <ul className="list-disc list-inside space-y-1 mb-3">
                <li>
                  Blocs are never closed so they are consuming resources even if
                  they aren&apos;t being used by the current widget tree
                </li>
                <li>
                  Blocs can be accessed from anywhere even if the state of the
                  bloc is scoped to just a particular feature
                </li>
                <li>
                  Blocs typically end up needing some sort of &quot;reset&quot;
                  event to revert back to the initial state
                </li>
              </ul>
              <p className="text-emerald-700 font-medium italic border-t border-emerald-200 pt-3">
                Recommendation: Create a bloc per feature and provide that bloc
                only to the specific subtree that needs it.
              </p>
            </blockquote>
          </div>

          <h4 className="font-semibold text-gray-900 mb-4">Key Takeaways:</h4>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 text-center">
              <h5 className="font-bold text-gray-900 mb-2">Scoped Access</h5>
              <p className="text-sm text-gray-600">
                Limit bloc access to only the widgets that need it
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 text-center">
              <h5 className="font-bold text-gray-900 mb-2">
                Resource Management
              </h5>
              <p className="text-sm text-gray-600">
                Ensure proper disposal of blocs when not needed
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 text-center">
              <h5 className="font-bold text-gray-900 mb-2">
                Feature Isolation
              </h5>
              <p className="text-sm text-gray-600">
                Maintain clear boundaries between features
              </p>
            </div>
          </div>
        </SectionCard>

        {/* Proper BlocProvider Disposal */}
        <SectionCard
          icon="fas fa-trash-alt"
          title="Proper BlocProvider Disposal"
        >
          <span className="inline-block px-2.5 py-1 text-xs font-semibold rounded-md bg-blue-100 text-blue-700 mb-4">
            Best Practice
          </span>
          <h3 className="text-lg font-bold text-gray-900 mb-3">
            Login Flow Example
          </h3>

          <AlertBox variant="warning">
            Common Mistake: Keeping login-related blocs active after successful
            authentication
          </AlertBox>

          <h4 className="font-semibold text-gray-900 mb-3">
            Proper Implementation:
          </h4>
          <CodeBlock lang="dart">{`class LoginPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (context) => LoginBloc(
        authRepository: context.read<AuthRepository>(),
      ),
      child: LoginView(),
    );
  }
}

class LoginView extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return BlocListener<LoginBloc, LoginState>(
      listener: (context, state) {
        if (state.status == LoginStatus.success) {
          // Navigate and remove login route from stack
          Navigator.of(context).pushReplacement(
            MaterialPageRoute(builder: (_) => HomePage()),
          );
          // LoginBloc will be automatically disposed
        }
      },
      child: // Your login form widgets
    );
  }
}`}</CodeBlock>

          <h4 className="font-semibold text-gray-900 mb-4">
            Benefits of Proper Disposal:
          </h4>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <InfoCard title="🧠 Memory Efficiency" variant="green">
              <ul className="space-y-1">
                <li>✓ Resources freed after use</li>
                <li>✓ No memory leaks</li>
                <li>✓ Better app performance</li>
              </ul>
            </InfoCard>
            <InfoCard title="🛡️ State Management" variant="green">
              <ul className="space-y-1">
                <li>✓ Clean state transitions</li>
                <li>✓ No state conflicts</li>
                <li>✓ Predictable behavior</li>
              </ul>
            </InfoCard>
            <InfoCard title="📦 Code Organization" variant="green">
              <ul className="space-y-1">
                <li>✓ Better feature isolation</li>
                <li>✓ Clearer dependencies</li>
                <li>✓ Easier maintenance</li>
              </ul>
            </InfoCard>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
            <h4 className="flex items-center gap-2 font-semibold text-amber-800 mb-3">
              <i className="fas fa-lightbulb"></i> Pro Tips:
            </h4>
            <ul className="space-y-2 text-sm text-amber-900">
              <li>
                • Use{" "}
                <code className="bg-amber-100 px-1.5 py-0.5 rounded text-xs">
                  pushReplacement
                </code>{" "}
                instead of{" "}
                <code className="bg-amber-100 px-1.5 py-0.5 rounded text-xs">
                  push
                </code>{" "}
                to remove the login page from navigation stack
              </li>
              <li>
                • Scope blocs to specific features rather than making them
                global
              </li>
              <li>
                • Let the widget tree handle bloc lifecycle through proper
                widget disposal
              </li>
              <li>
                • Consider using{" "}
                <code className="bg-amber-100 px-1.5 py-0.5 rounded text-xs">
                  BlocProvider.value
                </code>{" "}
                only when passing existing bloc instances
              </li>
            </ul>
          </div>
        </SectionCard>

        {/* Understanding MultiBlocProvider Usage */}
        <SectionCard
          icon="fas fa-layer-group"
          title="Understanding MultiBlocProvider Usage"
        >
          <span className="inline-block px-2.5 py-1 text-xs font-semibold rounded-md bg-blue-100 text-blue-700 mb-4">
            Best Practice
          </span>
          <h3 className="text-lg font-bold text-gray-900 mb-3">
            When and How to Use MultiBlocProvider
          </h3>

          <AlertBox variant="info">
            MultiBlocProvider isn&apos;t inherently bad — it&apos;s about using
            it correctly and when necessary.
          </AlertBox>

          <h4 className="font-semibold text-gray-900 mb-3">
            Good Use Cases for MultiBlocProvider:
          </h4>
          <CodeBlock lang="dart">{`// Example: Dashboard page requiring multiple related features
class DashboardPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MultiBlocProvider(
      providers: [
        BlocProvider<UserStatsBloc>(
          create: (context) => UserStatsBloc()..add(LoadUserStats()),
        ),
        BlocProvider<NotificationsBloc>(
          create: (context) => NotificationsBloc()..add(LoadNotifications()),
        ),
        BlocProvider<ActivityBloc>(
          create: (context) => ActivityBloc()..add(LoadRecentActivity()),
        ),
      ],
      child: DashboardView(),
    );
  }
}`}</CodeBlock>

          <h4 className="font-semibold text-gray-900 mb-4">
            Appropriate vs Inappropriate Usage:
          </h4>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <InfoCard title="✅ Good Usage" variant="green">
              <div className="space-y-4">
                <div>
                  <p className="font-semibold">Feature-Specific Pages:</p>
                  <p className="text-gray-600 text-xs">
                    When multiple blocs are needed for a specific feature&apos;s
                    functionality
                  </p>
                  <code className="text-xs text-emerald-700 bg-emerald-50 px-2 py-1 rounded block mt-1">
                    DashboardPage with related stats, notifications, and
                    activity blocs
                  </code>
                </div>
                <div>
                  <p className="font-semibold">Related Data Management:</p>
                  <p className="text-gray-600 text-xs">
                    When blocs have interdependent functionality
                  </p>
                  <code className="text-xs text-emerald-700 bg-emerald-50 px-2 py-1 rounded block mt-1">
                    Shopping cart with inventory and payment blocs
                  </code>
                </div>
                <div>
                  <p className="font-semibold">Scoped Feature Sets:</p>
                  <p className="text-gray-600 text-xs">
                    When multiple blocs share the same lifecycle
                  </p>
                  <code className="text-xs text-emerald-700 bg-emerald-50 px-2 py-1 rounded block mt-1">
                    User profile with settings and preferences blocs
                  </code>
                </div>
              </div>
            </InfoCard>
            <InfoCard title="❌ Bad Usage" variant="red">
              <div className="space-y-4">
                <div>
                  <p className="font-semibold">Global App State:</p>
                  <p className="text-gray-600 text-xs">
                    Don&apos;t wrap MaterialApp with unrelated blocs
                  </p>
                  <code className="text-xs text-red-700 bg-red-50 px-2 py-1 rounded block mt-1">
                    Wrapping entire app with authentication, settings, and cart
                    blocs
                  </code>
                </div>
                <div>
                  <p className="font-semibold">Unrelated Features:</p>
                  <p className="text-gray-600 text-xs">
                    Don&apos;t combine blocs that serve different purposes
                  </p>
                  <code className="text-xs text-red-700 bg-red-50 px-2 py-1 rounded block mt-1">
                    Mixing login bloc with product catalog bloc
                  </code>
                </div>
                <div>
                  <p className="font-semibold">Different Lifecycles:</p>
                  <p className="text-gray-600 text-xs">
                    Don&apos;t combine blocs with different disposal needs
                  </p>
                  <code className="text-xs text-red-700 bg-red-50 px-2 py-1 rounded block mt-1">
                    Combining temporary chat bloc with persistent theme bloc
                  </code>
                </div>
              </div>
            </InfoCard>
          </div>

          <h4 className="font-semibold text-gray-900 mb-3">
            Practical Implementation Example:
          </h4>
          <CodeBlock lang="dart">{`// E-commerce product detail page example
class ProductDetailPage extends StatelessWidget {
  final String productId;

  ProductDetailPage({required this.productId});

  @override
  Widget build(BuildContext context) {
    return MultiBlocProvider(
      providers: [
        BlocProvider<ProductDetailBloc>(
          create: (context) => ProductDetailBloc()
            ..add(LoadProductDetails(productId)),
        ),
        BlocProvider<ProductReviewsBloc>(
          create: (context) => ProductReviewsBloc()
            ..add(LoadProductReviews(productId)),
        ),
        BlocProvider<RelatedProductsBloc>(
          create: (context) => RelatedProductsBloc()
            ..add(LoadRelatedProducts(productId)),
        ),
      ],
      child: ProductDetailView(),
    );
  }
}

// These blocs will be disposed when leaving ProductDetailPage`}</CodeBlock>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-4">
            <h4 className="flex items-center gap-2 font-semibold text-gray-900 mb-3">
              <i className="fas fa-star text-amber-500"></i> Best Practices:
            </h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>
                • Group blocs that are logically related and share the same
                lifecycle
              </li>
              <li>
                • Dispose of blocs when their feature/page is no longer needed
              </li>
              <li>
                • Consider performance implications of initializing multiple
                blocs
              </li>
              <li>• Use lazy loading when possible to defer bloc creation</li>
              <li>
                • Keep bloc providers as close as possible to where they&apos;re
                needed
              </li>
            </ul>
          </div>

          <AlertBox variant="warning">
            <p className="font-semibold mb-2">Common Pitfalls to Avoid:</p>
            <ul className="space-y-1">
              <li>
                • Don&apos;t use MultiBlocProvider at app root unless absolutely
                necessary
              </li>
              <li>• Avoid mixing blocs with different scopes or lifecycles</li>
              <li>
                • Don&apos;t initialize blocs that aren&apos;t immediately
                needed
              </li>
              <li>
                • Be cautious of memory usage when creating multiple blocs
              </li>
            </ul>
          </AlertBox>
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

export default function FlutterBlogPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="animate-pulse text-gray-400">Loading...</div>
        </div>
      }
    >
      <FlutterBlogContent />
    </Suspense>
  );
}
