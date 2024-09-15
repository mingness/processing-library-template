var __index = {"config":{"lang":["en"],"separator":"[\\s\\-]+","pipeline":["stopWordFilter"]},"docs":[{"location":"index.html","title":"Processing Library Template","text":"<p>The Processing Library Template is a template to help developers of Processing libraries to develop and release. It can be found on Github at https://github.com/mingness/processing-library-template.</p> <p></p> <p>This documentation provides information on</p> <ol> <li>Getting started</li> <li>The development process</li> <li>Releasing your library</li> <li>Troubleshooting</li> </ol>"},{"location":"index.html#references","title":"References","text":"<p>Existing references for developing libraries for Processing can be found on the following Github wiki pages:</p> <ul> <li>https://github.com/benfry/processing4/wiki/Library-Basics</li> <li>https://github.com/benfry/processing4/wiki/Library-Guidelines</li> <li>https://github.com/benfry/processing4/wiki/Library-Overview</li> </ul>"},{"location":"index.html#contributors","title":"Contributors","text":"<p>This template was created as part of the 2024 New Beginnings (pr05) Grant from the Processing Foundation, to simplify the workflows for libraries, tools, and modes, mentored by @Stefterv.</p> <p>It is based on and inspired by a number of Processing library templates, including:</p> <ul> <li>https://github.com/processing/processing-library-template-gradle</li> <li>https://github.com/enkatsu/processing-library-template-gradle</li> <li>https://github.com/hamoid/processing-library-template/</li> </ul> <p>I wish to thank the developers of these repositories, who generously provided guidance and time. This template has been developed in collaboration with @enkatsu.</p>"},{"location":"develop.html","title":"The Development Process","text":"<p>You're now ready to develop your library. To do this, you'll need to resolve dependencies, in order to use them in your code. You do this by adding your dependencies  to the Gradle build file.</p> <p>Once you've finished developing your library, you'll want to test your library in Processing. To test your library in Processing, you'll want to first  configure the build parameters. Then, create release artifacts and install them into Processing,</p> <p>To test your library in Processing, you'll need to run simple sketches. Please include simple  sketches that show how to use your library in the <code>examples</code> folder. The example sketch included in this template outputs the image shown on the home page.</p> <p>Also, existing references for developing libraries for Processing can be found on the following Github wiki pages:</p> <ul> <li>https://github.com/benfry/processing4/wiki/Library-Basics</li> <li>https://github.com/benfry/processing4/wiki/Library-Guidelines</li> <li>https://github.com/benfry/processing4/wiki/Library-Overview</li> </ul> <p>Before following this guide, we recommend to follow the steps in the getting started guide first.</p>"},{"location":"develop.html#developing-the-library","title":"Developing the library","text":"<p>Develop your library within <code>src/main/java/</code>. Set the <code>package</code> at the top of your file to your own group id and library name, all together. For instance, in the example library, the group id is <code>com.myDomain</code> and the library name is <code>myLibrary</code>. The package is then <code>com.myDomain.myLibrary</code>. These values will need to match the values input into your Gradle build file, <code>build.gradle.kts</code>. More on this in Configuring the Gradle build file.</p> <p>Intellij and Visual Studio Code will then direct you to move your code into nested folders, consistent with your package name. For instance, if the package is <code>com.myDomain.myLibrary</code>, the code will be in the folder structure <code>src/main/java/com/myDomain/myLibrary/</code>.</p>"},{"location":"develop.html#resolving-dependencies","title":"Resolving dependencies","text":"<p>In the <code>build.gradle.kts</code> file, there are a few places you should edit, to input your own values. The part of the file that you are invited to edit is indicated by the comment  <code>USER BUILD CONFIGURATIONS</code>. We cover here how to add dependencies for your library. The relevant sections of the <code>build.gradle.kts</code> file are the <code>repositories</code> and <code>dependencies</code> sections.</p> <p>The locations where dependencies will be resolved from are the <code>repositories</code>. Most dependencies can be resolved from Maven. You can add additional repositories here if your dependencies are hosted elsewhere. </p> <p>Your dependencies should be listed within <code>dependencies</code>. For example, the example library uses the <code>commons-math3</code> package from <code>org.apache.commons</code> as a dependency, which is resolved from your listed repositories. It is listed within <code>dependencies</code> with the following structure:</p> <pre><code>implementation(group = \"org.apache.commons\", name = \"commons-math3\", version = \"3.6.1\")\n</code></pre> <p>This dependency, <code>commons-math3</code>, is only needed by the example library.  You can delete this dependency for your own library.  Add your own dependencies using the same structure.</p> <p>NOTE: Dependencies added with <code>implementation</code> will be included in the release. Dependencies added with <code>compileOnly</code>, such as Processing core, are available for compilation, but won't be included in the release.</p> <p>After you add these dependencies, refresh Gradle, and then you will be able to access them in your code. Refresh Gradle by going to the Gradle menu (elephant) in your IDE and click on the refresh icon, which is two arrows pointing at each other's ends in a circle.</p>"},{"location":"develop.html#configuring-the-gradle-build-file","title":"Configuring the Gradle build file","text":"<p>In the <code>build.gradle.kts</code> file, there are a few places you should edit, to input your own values. The section that you are invited to edit is indicated by the comment <code>USER BUILD CONFIGURATIONS</code>. We cover here how to configure the editable sections of the <code>build.gradle.kts</code> file, aside from those sections for resolving dependencies.</p> <ol> <li>Edit the variable <code>libName</code> to contain the name of your library. The name can only contain     lower case alphanumeric characters, and \"-\".      This value is used by Gradle to name the built jar file, and the zip file holding     your release artifacts. If this name does not match the name of the library in your code,      as discussed in the section Developing the library,     Processing will not find your library.</li> <li>Edit the variable <code>group</code> with your own domain or organization name. The group id      of your library uniquely identifies your project. It's often written in reverse domain name      notation. For example, if your website is \"myDomain.com\", your group ID would be      \"com.myDomain\". This group id should match the group id discussed in      section Developing the library.</li> <li> <p>Define the <code>version</code> of your library in <code>build.gradle.kts</code>. This value will also be     included in the release artifact <code>library.properties</code>. The version of your library usually      follows semantic versioning (semver), which uses three numbers separated by dots:      \"MAJOR.MINOR.PATCH\" (e.g., \"1.0.0\"). </p> <ul> <li>MAJOR: Increases when you make incompatible changes.</li> <li>MINOR: Increases when you add new features that are backward-compatible.</li> <li>PATCH: Increases when you make backward-compatible bug fixes.</li> </ul> <p>You will update these numbers as you release new versions of your library.</p> </li> <li> <p>The <code>sketchbookLocation</code> is determined programmatically by your operation system, and is     where your Processing <code>sketchbook</code> folder is. This folder contains your installed libraries.     It is needed if you:</p> <ol> <li>wish to copy the library to the Processing sketchbook, which installs the library locally</li> <li>have Processing library dependencies</li> </ol> <p>This variable is in the editable section, in case the location determined is incorrect. A  symptom of an incorrect <code>sketchbookLocation</code> is that your library does not show up in the Contribution Manager in Processing, after being installed. Please look at our  troubleshooting guide if you suspect this is the case.</p> </li> </ol>"},{"location":"develop.html#creating-the-release-artifacts","title":"Creating the release artifacts","text":"<p>If you've already gone through the Getting started guide, you will have already run Gradle tasks, and edited the <code>release.properties</code> file.</p> <ol> <li>Fill in the file <code>release.properties</code> with information for your library. This information will be     used by Gradle to create the <code>library.properties</code> file, which is one of the required release      artifacts, used by the website and Contribution Manager to describe your library. In the file itself,     There are comments to guide you. To create just the <code>library.properties</code> file without building the     library, toggle <code>Tasks</code> &gt; <code>processing</code> and double click <code>writeLibraryProperties</code>. This task will     copy all the values in <code>release.properties</code>, and also include the <code>version</code> in your <code>build.gradle.kts</code>     file as <code>prettyVersion</code>.</li> <li>To build the library and create the release artifacts, run the Gradle task <code>releaseProcessingLib</code>.     This task will create a <code>release</code> folder with needed artifacts. To do this, go to the Gradle menu      (elephant), toggle <code>Tasks</code> &gt; <code>processing</code> and double click <code>releaseProcessingLib</code>. This task      has bundled the following required tasks:<ol> <li><code>build</code> task: this bundles a number of build tasks, including the <code>jar</code> task which creates a     jar file. all build artifacts are in the folder <code>build</code>.</li> <li>documentation build.</li> <li>creation of the <code>library.properties</code> file: this file is built from the properties set in the    <code>release.properties</code> file, plus the version, in the task <code>writeLibraryProperties</code>.</li> <li>within the <code>releaseProcessingLib</code> task, the <code>release</code> folder is created, jars of the library and     dependencies are copied, and the <code>library.properties</code> file is copied. Also, a zip file is made.</li> </ol> </li> <li>When you would like to test your library in Processing, toggle <code>Tasks</code> &gt; <code>processing</code> and double click     <code>deployToProcessingSketchbook</code>, which will create the release artifacts, and copy them into the      sketchbook folder.</li> </ol>"},{"location":"getting-started.html","title":"Getting Started","text":"<p>We are excited that you wish to contribute to the Processing ecosystem.</p> <p>This template is designed to make that process as simple as possible.</p> <p>This guide will get you started on your journey, help orient you to the template. </p>"},{"location":"getting-started.html#setting-up-the-environment","title":"Setting up the environment","text":"<p>These steps will help you create your own repository on Github, and install necessary software.</p> <ol> <li>Create your own repository on Github, using the repository processing-library-template    as a template.    (A guide to creating a repository from a template.)    Select a different name for your repository that represents the library you will build. You can also     rename your repository at a later time.</li> <li>Clone your new repository, aka create a local copy of your repository on your computer.    (A guide to cloning a repository)</li> <li>Install Processing, if you haven't already. </li> <li>Install an integrated development editor (IDE) such as Intellij,     or Visual Studio Code, if you haven't already.     Intellij comes fully featured, and has a free community version. Additional features can be added to     Visual Studio Code by installing extensions, such as Gradle for Java, or Language support for Java.</li> </ol>"},{"location":"getting-started.html#first-steps","title":"First steps","text":"<p>These steps use the template as is, to allow you to interact with the build environment, and with Processing. You can use these interactions to test the library.</p> <ol> <li>Open up your new repository in your chosen IDE.</li> <li>Run the Gradle task, deployToProcessingSketchbook: The repository as is should build in Gradle.     In the Gradle menu (elephant) in your IDE, navigate to <code>Tasks</code> &gt; <code>processing</code> &gt;     <code>deployToProcessingSketchbook</code>, and double click on <code>deployToProcessingSketchbook</code>.     This will run the Gradle task named <code>deployToProcessingSketchbook</code>.    Running this task will build the library, create the release artifacts, and copy them into     where your installed libraries are stored.</li> <li>The library can now be seen in the Contribution Manager. Open Processing, and click on     <code>Sketch</code> &gt; <code>Import Library ...</code> &gt; <code>Manage Libraries ...</code>. This opens the Contribution Manager.     There should be an entry named \"A Template Example Library\" with a check mark next to it.     That is the entry for the example library that was installed in the previous step.     If the library does not appear in the Contribution     Manager, please check the troubleshooting guide.</li> <li>Customize what will be shown in the Contribution Manager for your library:    Open the file <code>release.properties</code> and change the value of the fields <code>name</code>,     <code>authors</code>, and <code>sentence</code>. Rerun the Gradle task, <code>deployToProcessingSketchbook</code>. This    will reinstall the library with the updated values, and these values should be visible    in the Contribution Manager.</li> </ol>"},{"location":"getting-started.html#next-steps","title":"Next Steps","text":"<p>Great, now you should be a little more familiar with the workings of the library template.</p> <p>Checkout some other guides on</p> <ol> <li>The development process</li> <li>Releasing your library</li> <li>Troubleshooting</li> </ol>"},{"location":"release.html","title":"Releasing your library","text":"<p>You've written your library, created examples, and tested it in Processing. Now you are ready to release  and publish it.</p> <p>You'll want to:</p> <ol> <li>create a documentation website, like the one you are reading now</li> <li>create a release on Github</li> <li>Once you are ready to add your contribution to the Contribution Manager,  email contributions@processing.org with the url to your release artifacts.</li> </ol>"},{"location":"release.html#creating-your-website","title":"Creating your website","text":"<p>A requirement for having your library listed officially is to have a stable documentation website. Material for MkDocs, is a straightforward way of creating content.</p> <p>The configuration of the website is defined in the <code>mkdocs.yml</code> file. We have included some plugins, such as search, code block copy and annotations, and navigation bars. The navigation menu is configured in <code>mkdocs.yml</code> as well.</p> <p>If your library is on Github, then you can take advantage of Github Pages to deploy and host the website. We have configured a Github workflow at <code>.github/workflows/deploy-website.yml</code> that will process files in the <code>docs</code> folder with Material for MkDocs and deploy it as a Github Page. The steps to deploying your MkDocs website with Github pages are below:</p> <ol> <li>You'll need to activate Github Pages and Github Actions for your project in the settings.</li> <li>In settings &gt; Github Pages, set the Source to \"Deploy from a branch.\"    Set the branch to <code>gh-pages</code>. Serve from the root folder.</li> <li>Edit the markdown files in the <code>docs</code>, and configure the navigation menu in <code>mkdocs.yml</code> file.</li> <li>Include the url of your website in the property named <code>url</code> in the <code>release.properties</code>. </li> </ol>"},{"location":"release.html#release-on-github","title":"Release on Github","text":"<p>Releasing on Github provides an easy reference for stable versions. Github provides documentation on releasing projects. When creating your release, use a tag that starts with \"v\". This triggers a Github workflow (<code>.github/workflows/release.yml</code>) that will automatically upload the necessary  release artifacts, such as the <code>*.txt</code>, <code>*.zip</code>, <code>*.pdex</code> files in your <code>release</code> folder.  Github by default will include compressed versions of your source code only.</p>"},{"location":"troubleshooting.html","title":"Troubleshooting","text":""},{"location":"troubleshooting.html#library-does-not-appear-in-the-contribution-manager","title":"Library does not appear in the Contribution Manager","text":"<ol> <li>Please check that the value you have for your library name in the code is the same as the <code>libName</code> in    the <code>build.gradle.kts</code> file. </li> <li>One possible issue is the location of your <code>sketchbook</code> folder. Processing stores installed libraries in     the <code>sketchbook</code> folder. Where your <code>sketchbook</code> folder is located depends on your operating system. You     can see where Gradle thinks your sketchbook folder is in the task run output. Check that the folder exists,     and contains the subfolder <code>libraries</code>. If not, you can check the sketchbook location in your Processing     application preferences.  Click on <code>File</code> &gt; <code>Preferences</code>, and note the sketchbook folder location. If this     location is different from what's in the Gradle build file, you will need to input the value manually. Also,     please submit an issue to this repository.</li> </ol>"},{"location":"troubleshooting.html#dependency-is-not-accessible-in-code","title":"Dependency is not accessible in code","text":"<ol> <li>If a dependency is not accessible in your code, check for errors in the build window in     Intellij (hammer icon), or run <code>Tasks</code> &gt; <code>build</code> &gt; <code>build</code>, and look for an error message.</li> </ol>"}]}