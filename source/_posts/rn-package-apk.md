---
title: 将 React Native 应用签名打包成 APK
date: 2018-07-26 11:31:52
tags:
  - React Native
  - 跨端
  - Android
category: 跨端技术
---

Android要求所有应用都有一个数字签名才会被允许安装在用户手机上，所以在把应用发布到类似Google Play Store这样的应用市场之前，你需要先生成一个签名的APK包。Android开发者官网上的如何给你的应用签名文档描述了签名的细节。

# 环境配置

## Java Development Kit

Android应用是由Java编写而成，生成签名的工具也同时依赖于Java Development Kit（JDK），因此，我们首先需要下载安装JDK。JDK的安装步骤很简单，在macOS环境下，只需将dmg镜像挂载，双击pkg文件，一直点击「Next」即可完成安装。安装完成后，为了确定JDK是否安装成功并且生效，请在终端中运行

```
java -version
```

如果结果如下图所示，则说明JDK已配置成功。
![https://lenconda.oss-cn-beijing.aliyuncs.com/180726/1.png](https://lenconda.oss-cn-beijing.aliyuncs.com/180726/1.png)

## Android Studio

Android Studio基于JetBrains Intellij IDEA开发，安装和配置方式和JetBrains IDE一致。在官网下载Mac安装包，依据提示安装并配置好Android SDK。

# 生成签名密钥

在配置好JDK之后，可以通过`keytool`生成一个密钥。macOS和Linux的`keytool`一般位于`/usr/bin/keytool`，Windows的keytool位于JDK安装目录的`bin/`下。执行如下命令：

```
keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

这条命令会要求你输入密钥库（keystore）和对应密钥的密码，然后设置一些发行相关的信息。最后它会生成一个叫做`my-release-key.keystore`的密钥库文件。

在运行上面这条语句之后，密钥库里应该已经生成了一个单独的密钥，有效期为10000天。`--alias`参数后面的别名是你将来为应用签名时所需要用到的，所以记得记录这个别名。

**注意：请记得妥善地保管好你的密钥库文件，不要上传到版本库或者其它的地方。**

# 设置Gradle变量

> 1. 将`my-release-key.keystore`文件放到工程根目录中的`android/app/`下。
> 2. 编辑工程根目录下的`android/gradle.properties`，添加如下的代码（注意把其中的****替换为相应密码）

**注意：`~`表示用户目录，比如Windows上可能是`C:\Users\用户名`，而macOS上可能是`/Users/用户名`。**

```
MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_STORE_PASSWORD=*****
MYAPP_RELEASE_KEY_PASSWORD=*****
```

![https:\/\/lenconda.oss-cn-beijing.aliyuncs.com\/180726\/2.png](https:\/\/lenconda.oss-cn-beijing.aliyuncs.com\/180726\/2.png)

上面的这些会作为全局的gradle变量，我们在后面的步骤中可以用来给应用签名。

> **关于密钥库的注意事项:**
>
> 一旦你在Play Store发布了你的应用，如果想修改签名，就必须用一个不同的包名来重新发布你的应用（这样也会丢失所有的下载数和评分）。所以请务必备份好你的密钥库和密码。

# 将签名添加到Gradle脚本中

编辑工程根目录下的`android/app/build.gradle`，添加如下的签名配置：
```
...
android {
    ...
    defaultConfig { ... }
    signingConfigs {
        release {
            storeFile file(MYAPP_RELEASE_STORE_FILE)
            storePassword MYAPP_RELEASE_STORE_PASSWORD
            keyAlias MYAPP_RELEASE_KEY_ALIAS
            keyPassword MYAPP_RELEASE_KEY_PASSWORD
        }
    }
    buildTypes {
        release {
            ...
            signingConfig signingConfigs.release
        }
    }
}
...
```

![https://lenconda.oss-cn-beijing.aliyuncs.com/180726/3.png](https://lenconda.oss-cn-beijing.aliyuncs.com/180726/3.png)

# 生成JavaScript Bundle文件

React Native项目在编译Android APK时需要提供一个JavaScript Bundle（`index.android.bundle`）作为APP的入口文件。如果不生成该文件，**虽然能成功打包，但会造成闪退而导致无法启动APP！**

生成JS Bundle时在工程根目录下执行如下命令：

```
react-native bundle --platform android --dev false --entry-file index.js  --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/
```

**注意这里的`--ectry-file`选项指定的文件名并不一定是`index.js`，如果工程中的JS入口文件是`index.android.js`，那么请根据文件名对改命令进行相应的修改。**

# 生成APK包

## 命令行方式

执行如下两条命令：

```
cd android
./gradlew installRelease
```

等待命令结束后即可生成APK包。

## 使用Android Studio

在菜单栏中点击`Build -> Generate Signed APK...`：

![https://lenconda.oss-cn-beijing.aliyuncs.com/180726/4.png](https://lenconda.oss-cn-beijing.aliyuncs.com/180726/4.png)

在弹出的窗口中选择Module：`app`，点击「Next」：

![https://lenconda.oss-cn-beijing.aliyuncs.com/180726/5.png](https://lenconda.oss-cn-beijing.aliyuncs.com/180726/5.png)

在窗口中选择生成的密钥，将正确的信息填入。

然后一路「Next」直到「Finish」。

**生成的APK包是`android/app/release/app-release.apk`**

# 参考

[1]. [打包APK \- React Native 中文网](https://reactnative.cn/docs/0.51/signed-apk-android.html#content)
[2]. [React Native打包后运行闪退 \- CSDN博客](https://blog.csdn.net/student9128/article/details/80322114)
