plugins {
    id("java")
    id("org.jetbrains.kotlin.jvm") version "1.9.22"
    id("org.jetbrains.intellij") version "1.17.2"
}

group = "com.scopelock"
version = "1.0.0"

repositories {
    mavenCentral()
}

intellij {
    version.set("2023.2.5")
    type.set("IC") // IntelliJ Community / WebStorm compatible
    plugins.set(listOf("git4idea"))
}

tasks {
    patchPluginXml {
        sinceBuild.set("232")
        untilBuild.set("243.*")
    }

    buildSearchableOptions {
        enabled = false
    }
}
