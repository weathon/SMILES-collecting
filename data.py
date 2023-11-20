with open("pccompound_result.txt", "r") as f:
    t = f.read().split("\n\n")


for i in t:
    name = (i.split("\n")[2].replace("IUPAC name: ",""))
    cid = (int(i.split("CID: ")[-1]))
    print(f"{name},{cid}")

