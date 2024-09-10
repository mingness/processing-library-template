# The Development Process

You're now ready to [develop your library](#developing-the-library). To do this, you'll need to resolve dependencies,
in order to use them in your code. You do this by [adding your dependencies](#resolving-dependencies) 
to the Gradle build file.

Once you've finished developing your library, you'll want to test your library in Processing.
To test your library in Processing, you'll want to first 
[configure the build parameters](#configuring-the-gradle-build-file).
Then, [create release artifacts and install them into Processing](#creating-the-release-artifacts),

To test your library in Processing, you'll need to run simple sketches. Please include simple 
sketches that show how to use your library in the `examples` folder. The example sketch included
in this template outputs the image shown on the home page.

Also, existing references for developing libraries for Processing can be found on the following Github wiki pages:

- [https://github.com/benfry/processing4/wiki/Library-Basics](https://github.com/benfry/processing4/wiki/Library-Basics)
- [https://github.com/benfry/processing4/wiki/Library-Guidelines](https://github.com/benfry/processing4/wiki/Library-Guidelines)
- [https://github.com/benfry/processing4/wiki/Library-Overview](https://github.com/benfry/processing4/wiki/Library-Overview)

Before following this guide, we recommend to follow the steps in the [getting started guide](getting-started.md)
first.


## Developing the library
**Develop your library within `src/main/java/`.** Set the `package` at the top of your file to your
own group id and library name, all together. For instance, in the example library, the group id is
`com.myDomain` and the library name is `myLibrary`. The package is then `com.myDomain.myLibrary`.
These values will need to match the values input into your Gradle build file, `build.gradle.kts`.
More on this in [Configuring the Gradle build file](#configuring-the-gradle-build-file).

Intellij and Visual Studio Code will then direct you to move your code into nested folders, consistent
with your package name. For instance, if the package is `com.myDomain.myLibrary`, the code will
be in the folder structure `src/main/java/com/myDomain/myLibrary/`.


## Resolving dependencies
In the `build.gradle.kts` file, there are a few places you should edit, to input your own values.
The part of the file that you are invited to edit is indicated by the comment 
`USER BUILD CONFIGURATIONS`. We cover here how to add dependencies for your library. The 
sections of the `build.gradle.kts` file are the `repositories` and `dependencies` sections.

**The locations where dependencies will be resolved from are the `repositories`.** Most
dependencies can be resolved from Maven. You can add additional repositories here if
your dependencies are hosted elsewhere. 

**Your dependencies should be listed within `dependencies`.** For example, the example
library uses `org.apache.commons:commons-math3` as a dependency, which is resolved from
your listed repositories. It is listed within `dependencies` with the following structure:
```
implementation("org.apache.commons:commons-math3:3.6.1")
```

This dependency, `org.apache.commons:commons-math3`, is only needed by the example library. 
You can delete this dependency for your own library. 
Add your own dependencies using the same structure.

NOTE: Dependencies added with `implementation` will be included in the release. Dependencies
added with `compileOnly`, such as Processing core, are available for compilation, but won't
be included in the release.

After you add these dependencies, **refresh Gradle**, and then you will be able to access them
in your code. Refresh Gradle by going to the Gradle menu (elephant) in your IDE
and click on the refresh icon, which is two arrows pointing at each other's ends in a circle.


## Configuring the Gradle build file
In the `build.gradle.kts` file, there are a few places you should edit, to input your own values.
The section that you are invited to edit is indicated by the comment `USER BUILD CONFIGURATIONS`.
We cover here how to configure the editable sections of the `build.gradle.kts` file, aside from
those sections for [resolving dependencies](#resolving-dependencies).

1. **Edit the variable `libName` to contain the name of your library**. The name can only contain
   lower case alphanumeric characters, and "-". 
   This value is used by Gradle to name the built jar file, and the zip file holding
   your release artifacts. If this name does not match the name of the library in your code, 
   as discussed in the section [Developing the library](#developing-the-library),
   Processing will not find your library.
2. **Edit the variable `group` with your own domain or organization name.** The group id 
   of your library uniquely identifies your project. It's often written in reverse domain name 
   notation. For example, if your website is "myDomain.com", your group ID would be "com.myDomain".
3. **Define the `version` of your library in `build.gradle.kts`.** This value will also be
   included in the release artifact `library.properties`. The version of your library usually 
   follows semantic versioning (semver), which uses three numbers separated by dots: 
   "MAJOR.MINOR.PATCH" (e.g., "1.0.0").
   - MAJOR: Increases when you make incompatible changes.
   - MINOR: Increases when you add new features that are backward-compatible.
   - PATCH: Increases when you make backward-compatible bug fixes.
   
   You will update these numbers as you release new versions of your library.
4. The `sketchbookLocation` is determined programmatically by your operation system, and is
   where your Processing `sketchbook` folder is. This folder contains your installed libraries.
   It is needed if you:

   1. wish to copy the library to the Processing sketchbook, which installs the library locally
   2. have Processing library dependencies
   
   This variable is in the editable section, in case the location determined is incorrect. A 
   symptom of an incorrect `sketchbookLocation` is that your library does not show up in the
   Contribution Manager in Processing, after being installed. Please look at our 
   [troubleshooting guide](troubleshooting.md) if you suspect this is the case.


## Creating the release artifacts
If you've already gone through the [Getting started](getting-started.md#first-steps) guide, you will have
already run Gradle tasks, and edited the `release.properties` file.

1. Fill in the file `release.properties` with information for your library. This information will be
   used by Gradle to create the `library.properties` file, which is one of the required release 
   artifacts, used by the website and Contribution Manager to describe your library. In the file itself,
   There are comments to guide you. To create just the `library.properties` file without building the
   library, toggle `Tasks` > `processing` and double click `writeLibraryProperties`. This task will
   copy all the values in `release.properties`, and also include the `version` in your `build.gradle.kts`
   file as `prettyVersion`.
2. **To build the library and create the release artifacts, run the Gradle task `releaseProcessingLib`.**
   This task will create a `release` folder with needed artifacts. To do this, go to the Gradle menu 
   (elephant), toggle `Tasks` > `processing` and double click `releaseProcessingLib`. This task 
   has bundled the following required tasks:
   1. `build` task: this bundles a number of build tasks, including the `jar` task which creates a
      jar file. all build artifacts are in the folder `build`.
   2. documentation build.
   3. creation of the `library.properties` file: this file is built from the properties set in the
      `release.properties` file, plus the version, in the task `writeLibraryProperties`.
   4. within the `releaseProcessingLib` task, the `release` folder is created, jars of the library and
      dependencies are copied, and the `library.properties` file is copied. Also, a zip file is made.
3. When you would like to test your library in Processing, toggle `Tasks` > `processing` and double click
   `deployToProcessingSketchbook`, which will create the release artifacts, and copy them into the 
   sketchbook folder.
