FROM centos:7
#声明镜像制作者
MAINTAINER LiFangchuan <328381256@qq.com>
#设置时区
ENV TZ "Asia/Shanghai"

# 设置系统环境变量DOCKER_SRC
#ENV DOCKER_SRC=/
# 设置系统环境变量DOCKER_HOME
#ENV DOCKER_HOME=/home/docker/FY-BXHT
# 设置系统环境变量DOCKER_PROJECT
ENV DOCKER_PROJECT=/home/docker/FY-BXHT/fy_dbms

#这句指令相当与：cd /root
#WORKDIR $DOCKER_HOME
#紧接着在root目录下面创建了两个文件夹
#安装应用运行所需要的工具依赖pip，git好像没用上，mysql客户端，
#nc是一个网络工具，端口检测脚本wait-for-it.sh里面有使用这个软件
RUN yum -y install epel-release && \
    yum -y install python-pip && yum -y install nginx && \
    yum -y install git nginx gcc gcc-c++ python-devel && \
    && yum install nc -y && yum clean all && \
    pip install --upgrade pip

# cd $DOCKER_PROJECT
WORKDIR $DOCKER_PROJECT
# . 表示当前目录，一是Dockerfile所在的目录，二是刚刚设置的DOCKER_PROJECT目录，
#这一步操作将会把项目中application目录下的所有文件拷贝到镜像目录DOCKER_PROJECT=/root/project下面
#COPY ./ ./
#这一步安装python依赖软件django、Pillow、mysql-python、uwsgi、django-ckeditor。
#补充，-i 是修改pip源，默认的源速度很慢，经常卡在这里。
RUN pip install -i https://pypi.tuna.tsinghua.edu.cn/simple -r requirements.txt
#赋予start_script执行权限
RUN chmod u+x start_script
#容器启动后要执行的命令
ENTRYPOINT ["./start_script"]