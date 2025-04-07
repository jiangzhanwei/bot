import os
import time
import random
from datetime import datetime
import subprocess

# 设置项目路径
project_path = "./"  # 替换为你的本地 Git 仓库路径
os.chdir(project_path)  # 进入项目文件夹

def run_git_command(command):
    """运行 git 命令并返回输出"""
    result = subprocess.run(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    if result.returncode != 0:
        print(f"Git 命令失败: {result.stderr.decode()}")
    return result.stdout.decode()

def create_file_with_time():
    """生成一个包含当前时间的文件"""
    # 获取今天的日期
    today = datetime.now().strftime('%Y-%m-%d')
    filename = f"{today}.txt"
    
    # 写入当前时间到文件
    with open(filename, "a") as f:
        current_time = datetime.now().strftime('%H:%M:%S')
        f.write(f"{current_time}\n")
    
    return filename

def commit_to_git():
    """将文件提交到 Git"""
    run_git_command(["git", "add", "."])  # 添加所有更改
    run_git_command(["git", "commit", "-m", "Add time to file"])  # 提交更改
    run_git_command(["git", "push", "origin", "main"])  # 推送到 GitHub

def auto_commit():
    print(datetime.now().strftime('%Y-%m-%d'))
    """每分钟生成一个文件并提交，随机提交1-20次"""
    total_commits = random.randint(4, 20)  # 随机提交次数
    for _ in range(total_commits):
        create_file_with_time()  # 创建文件并追加当前时间
        commit_to_git()  # 提交更改
        print(f"提交次数：{_ + 1}/{total_commits}")
        time.sleep(10)  # 等待 1 分钟

if __name__ == "__main__":
    auto_commit()
