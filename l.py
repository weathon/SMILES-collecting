with open("l.txt", "r") as f:
    txt = f.read().split("\n")

print("name,cid")
for i in txt:
    print(f"{i.split(",")[-1]},{i.split(",")[-1]}")