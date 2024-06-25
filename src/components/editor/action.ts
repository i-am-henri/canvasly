"use server"

export const saveToDBAction = (content: {version:string,objects: fabric.Object[]}[]) => {
    console.log("saved")
}