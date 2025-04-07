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

def delete_old_txt_files():
    """删除目录下旧的 .txt 文件"""
    for filename in os.listdir("."):
        if filename.endswith(".txt"):
            os.remove(filename)
            print(f"已删除：{filename}")

def create_file_with_time():
    """生成一个包含当前时间的文件"""
    today = datetime.now().strftime('%Y-%m-%d')
    filename = f"{today}.txt"
    current_time = datetime.now().strftime('%H:%M:%S')
    with open(filename, "a") as f:
        f.write(f"{current_time}\n")
    return filename

def commit_to_git():
    """将文件提交到 Git"""
    run_git_command(["git", "add", "."])
    run_git_command(["git", "commit", "-m", "Add time to file"])
    run_git_command(["git", "push", "origin", "main"])

def auto_commit():
    print("开始自动提交:", datetime.now().strftime('%Y-%m-%d'))

    # 删除旧文件
    delete_old_txt_files()

    # 自动提交逻辑
    total_commits = random.randint(4, 20)
    for i in range(total_commits):
        create_file_with_time()
        commit_to_git()
        print(f"提交次数：{i + 1}/{total_commits}")
        time.sleep(10)  # 每次间隔 10 秒，可改成 60 为每分钟一次

if __name__ == "__main__":
    auto_commit()
