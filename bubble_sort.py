data = [6, 15, 4, 2, 8, 5, 11, 9, 7, 13]

for i in range(len(data)):
    for j in range(len(data) - i - 1):    # ソート済みの部分以外でループ
        if data[j] > data[j + 1]:    # 前のほうが大きいとき
            data[j], data[j + 1] = data[j + 1], data[j]

print(data)
