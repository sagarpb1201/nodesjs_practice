const nonBlockingTaskPromise=(duration:number):Promise<void>=>{
    return new Promise((resolve,reject)=>{
        let result=Math.random()
    setTimeout(()=>{
        if(result>0.1){
            resolve();
        }else{
            reject(new Error("cannot be below 0.5"))
        }
        },duration)
    })
}

type UserData={name:string,age:number}
type UserPosts={id:number,post:string}

const fetchUserData=():Promise<UserData>=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve({name:"username",age:23})
        },3000)
    })
}

const fetchUserPosts=(username:string):Promise<UserPosts>=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve({id:1,post:"posteee"})
        },3000)
    })
}

console.log("server started")

// nonBlockingTaskPromise(3000).then(()=>console.log("User 1 request successful")).catch(error=>console.error("User 1 request failed",error))
// nonBlockingTaskPromise(3000).then(()=>console.log("user 2 request successsful")).catch(error=>console.error("User 2 request failed",error))

nonBlockingTaskPromise(3000)
.then(()=>fetchUserData())
.then((data)=>{console.log(data); return fetchUserPosts(data.name)})
.then((userPosts)=>console.log(userPosts))
.catch(err=>console.error(err));
console.log("Should resolve both request after 3 seconds")