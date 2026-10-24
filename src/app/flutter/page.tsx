"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import ArticleLayout, {
  ArticleLoading,
  ArticleNotFound,
} from "@/components/blog/ArticleLayout";
import CodeBlock from "@/components/blog/CodeBlock";
import {
  A,
  Blockquote,
  H2,
  H3,
  InlineCode,
  P,
  Ul,
} from "@/components/blog/prose";

const TITLE = "Flutter BlocProvider: Understanding Context and Performance";

const SO_QUESTION =
  "https://stackoverflow.com/questions/59902356/blocprovider-of-called-with-a-context-that-does-not-contain-a-bloc-even-that/";

/* ── blog content ──────────────────────────────────────────── */

function FlutterBlogContent() {
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
      tag="Flutter · State management"
      title={TITLE}
      lede="MultiBlocProvider looks simple, but putting it in the wrong place can quietly hurt your app's performance and make it harder to maintain. Here's what I've learned about it on real projects, often the hard way."
      readTime="8 min read"
      currentHref="/flutter?id=blog-1"
    >
      <P>
        If you&apos;ve used bloc for a while, you&apos;ve probably hit this
        error at least once:{" "}
        <InlineCode>
          BlocProvider.of() called with a context that does not contain a Bloc
        </InlineCode>
        . When I looked into it, I found a{" "}
        <A href={SO_QUESTION}>Stack Overflow question</A> where the answer with
        36 upvotes suggests wrapping your whole app in a global{" "}
        <InlineCode>MultiBlocProvider</InlineCode>.
      </P>
      <P>
        That does make the error go away, but it can also cause performance
        problems and memory leaks. Felix Angelov, who created the bloc library,
        has explained why. In this post I&apos;ll go through the problem, why
        the global fix is a bad idea, and how to scope blocs properly, with
        real examples.
      </P>
      <P>
        I&apos;ll assume you know the basics of Flutter and have used the BLoC
        pattern before.
      </P>

      <H2>The error</H2>
      <P>
        Here&apos;s a typical setup. The app has an authentication flow like
        this:
      </P>
      <CodeBlock lang="text">{`App() => LoginPage() => HomePage() => UserTokensPage()`}</CodeBlock>
      <P>And a lot of us start with something like this:</P>
      <CodeBlock filename="main.dart">{`void main() => runApp(App());

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
      <P>
        It looks right, but <InlineCode>BlocProvider</InlineCode> only wraps{" "}
        <InlineCode>LoginPage</InlineCode>. When you navigate to{" "}
        <InlineCode>HomePage</InlineCode>, the new route is added by the
        Navigator, which sits above the provider in the widget tree, not below
        it. So <InlineCode>HomePage</InlineCode> and{" "}
        <InlineCode>UserTokensPage</InlineCode> can&apos;t see{" "}
        <InlineCode>UserBloc</InlineCode>, the bloc is lost during navigation,
        and you get the error.
      </P>

      <H2>The popular fix, and why I&apos;d avoid it</H2>
      <P>
        The{" "}
        <A href={`${SO_QUESTION}60316681#60316681`}>highly upvoted answer</A>{" "}
        suggests moving the providers above <InlineCode>MaterialApp</InlineCode>{" "}
        so every route can reach them:
      </P>
      <CodeBlock filename="main.dart">{`void main() {
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
      <P>
        The error goes away, but now these blocs are never disposed. They keep
        using memory for the whole life of the app, even on screens that
        don&apos;t need them, which can lead to memory leaks. The state also
        becomes global: any widget can reach it, features aren&apos;t isolated
        anymore, and you end up writing manual &quot;reset&quot; logic to clear
        a bloc when the user leaves a screen.
      </P>
      <P>
        The <A href={`${SO_QUESTION}59970345#59970345`}>accepted answer</A> on
        that question is correct. But it never points out the problems with the
        global approach, so the popular answer is still the one people copy.
      </P>

      <H2>What the bloc author says</H2>
      <P>Felix Angelov wrote about this exact pattern in a GitHub issue:</P>
      <Blockquote
        cite={
          <>
            Felix Angelov, creator of bloc, in{" "}
            <A href="https://github.com/felangel/bloc/issues/3272/">
              felangel/bloc#3272
            </A>{" "}
            (March 10, 2022)
          </>
        }
      >
        <p className="mb-3">
          The main disadvantages of providing all blocs globally are:
        </p>
        <ul className="ps-6 list-disc space-y-1 mb-3">
          <li>
            Blocs are never closed so they are consuming resources even if they
            aren&apos;t being used by the current widget tree
          </li>
          <li>
            Blocs can be accessed from anywhere even if the state of the bloc is
            scoped to just a particular feature
          </li>
          <li>
            Blocs typically end up needing some sort of &quot;reset&quot; event
            to revert back to the initial state
          </li>
        </ul>
        <p>
          Create a bloc per feature and provide that bloc only to the specific
          subtree that needs it.
        </p>
      </Blockquote>
      <P>
        So the rule is simple: give each bloc only to the widgets that need it,
        let it be disposed when they&apos;re gone, and keep features separate.
      </P>

      <H2>Scope blocs to the screen that needs them</H2>
      <P>
        A login flow is a good example. A common mistake is keeping the login
        bloc alive after the user has signed in. Instead, provide it on the
        login page only:
      </P>
      <CodeBlock filename="login_page.dart">{`class LoginPage extends StatelessWidget {
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
      <P>
        Because of <InlineCode>pushReplacement</InlineCode>, the login route is
        removed from the stack after a successful login, and{" "}
        <InlineCode>LoginBloc</InlineCode> is disposed with it. That frees
        memory, avoids leftover state, and keeps the login logic inside the
        login feature where it belongs.
      </P>
      <P>A few things I keep in mind:</P>
      <Ul>
        <li>
          Use <InlineCode>pushReplacement</InlineCode> instead of{" "}
          <InlineCode>push</InlineCode> to remove the login page from the
          navigation stack.
        </li>
        <li>Scope blocs to features, not to the whole app.</li>
        <li>
          Let the widget tree handle the bloc&apos;s lifecycle. When the widget
          is disposed, so is the bloc.
        </li>
        <li>
          Use <InlineCode>BlocProvider.value</InlineCode> only when you&apos;re
          passing a bloc instance that already exists.
        </li>
      </Ul>

      <H2>So when is MultiBlocProvider fine?</H2>
      <P>
        <InlineCode>MultiBlocProvider</InlineCode> isn&apos;t bad on its own.
        The problem is where you put it. It&apos;s a good fit when one screen
        needs several related blocs, like a dashboard:
      </P>
      <CodeBlock filename="dashboard_page.dart">{`// Example: Dashboard page requiring multiple related features
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
      <P>
        The way I think about it: group blocs that belong to the same feature
        and share the same lifecycle, and keep everything else apart.
      </P>

      <H3>Good fits</H3>
      <Ul>
        <li>
          A feature page that needs several blocs, like a dashboard with stats,
          notifications and activity.
        </li>
        <li>
          Blocs that depend on each other, like a shopping cart with inventory
          and payment blocs.
        </li>
        <li>
          Blocs that share the same lifecycle, like a user profile with
          settings and preferences blocs.
        </li>
      </Ul>

      <H3>Bad fits</H3>
      <Ul>
        <li>
          Wrapping <InlineCode>MaterialApp</InlineCode> with unrelated blocs,
          like authentication, settings and cart.
        </li>
        <li>
          Mixing blocs for different purposes, like a login bloc with a product
          catalog bloc.
        </li>
        <li>
          Combining blocs with different lifecycles, like a temporary chat bloc
          with a persistent theme bloc.
        </li>
      </Ul>

      <P>
        Here&apos;s another example, a product detail page in an e-commerce
        app:
      </P>
      <CodeBlock filename="product_detail_page.dart">{`// E-commerce product detail page example
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
      <P>
        All three blocs are about the same product, and all three are disposed
        when the user leaves the page.
      </P>

      <H2>Rules of thumb</H2>
      <Ul>
        <li>
          Keep providers as close as possible to the widgets that use them.
        </li>
        <li>
          Don&apos;t put <InlineCode>MultiBlocProvider</InlineCode> at the app
          root unless you really need to.
        </li>
        <li>Only group blocs that are related and share the same lifecycle.</li>
        <li>Let blocs be disposed when their page or feature is gone.</li>
        <li>
          Use lazy loading where you can, so blocs aren&apos;t created before
          they&apos;re needed.
        </li>
        <li>Watch memory usage when a page creates many blocs.</li>
      </Ul>
      <P>
        That&apos;s what I wish I&apos;d known the first time I saw that error.
        I hope it saves you some debugging time.
      </P>
    </ArticleLayout>
  );
}

export default function FlutterBlogPage() {
  return (
    <Suspense fallback={<ArticleLoading />}>
      <FlutterBlogContent />
    </Suspense>
  );
}
