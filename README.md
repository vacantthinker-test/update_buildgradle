## 说明

---

阿里云镜像地址

https://developer.aliyun.com/mvn/guide

---

该js 添加aliyun镜像地址至

所有Android项目文件夹下的build.gradle

---

使用replaceAll()
```build.gradle
        mavenLocal()
        google()
        mavenCentral()
```

替换为如下内容
```build.gradle
        mavenLocal()
        maven {url 'https://maven.aliyun.com/repository/central'}
        maven {url 'https://maven.aliyun.com/repository/public/'}
        maven {url 'https://maven.aliyun.com/repository/google'}
        maven {url 'https://maven.aliyun.com/repository/gradle-plugin'}
        maven {url 'https://maven.aliyun.com/repository/spring'}
        maven {url 'https://maven.aliyun.com/repository/spring-plugin'}
        maven {url 'https://maven.aliyun.com/repository/grails-core'}
        maven {url 'https://maven.aliyun.com/repository/apache-snapshots'}

```

---

- 1 使用android studio 创建一个项目
- 2 在gradle build 时关闭Android studio
- 3 把当前项目与其他Android项目 并列存放
- 4 执行index.js文件
    - node index.js
- 5 所有Android项目文件夹下 build.gradle 都被更新了, 添加了 aliyun maven 镜像地址

---

end
