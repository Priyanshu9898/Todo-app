"use client";


import { AiOutlinePlus } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import { GoSignOut } from "react-icons/go";
import { useAuth } from "@firebase/auth";
import { useRouter } from "next/navigation";
import Loading from "./loading";
import { db } from "@firebase/firebase";
import { collection, addDoc, getDoc, setDoc, updateDoc, query, doc, where, deleteDoc, getDocs  } from "firebase/firestore";
import { useEffect, useState } from "react";



const Home = () => {

  const [todo, setTodo] = useState("");
  const [allTodos, setAllTodos] = useState([]);


  const router = useRouter();

  const { authUser, isLoading, HandleSignOut} = useAuth();

  useEffect(() => {

    if(authUser) {
      fetchTodos(authUser.uid);
    }
    else{
      router.push("/login");
    }
    
  }, [authUser, isLoading, router]);

  const handleLogoutClick = () => {
    HandleSignOut();
    router.push("/login");
  }

  const handleChange = (e) => {
    setTodo(e.target.value);
  }


  const addTodo = async () => {
    try {

      console.log(todo, authUser.uid);

      if(todo.length > 0) {

        const docRef = await addDoc(collection(db, "todos"), {
          content: todo,
          completed: false,
          owner: authUser.uid,
        });

      }

      // console.log("Document written with ID: ", docRef.id);

      fetchTodos(authUser.uid);

      setTodo("");

    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }


  const fetchTodos = async (uid) => {
    try {
      const q = query(collection(db, "todos"), where("owner", "==", uid));
      const data = []
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());

        data.push({...doc.data(), id: doc.id});
      });


      setAllTodos(data);

    } catch (e) {
      console.log("Error getting cached document:", e);
    }
  }


  const deteteTodoItem = async (uid) => {
    try{
      await deleteDoc(doc(db, "todos", uid));

      console.log("delete document successfully");

      fetchTodos(authUser.uid);

    }
    catch(err){
      console.log("Error deleting document:", err);
    }
  }

  const handleUpdateChange = async (e, uid) => {

    try{

      console.log(uid);

      const item = doc(db, "todos", uid);

      console.log(item);
      // Set the "capital" field of the city 'DC'
      await updateDoc(item, {
        completed: e.target.checked,
      });

      console.log("Updated successfully")
      fetchTodos(authUser.uid);
    }
    catch(err){
      console.log("Error updating document:", err);
    }
  }

  return (!authUser) ? (<><Loading /></>) : (
    <main className="max-w-screen-lg mx-auto p-8">
      <div onClick={handleLogoutClick} className="flex justify-end mt-10 space-x-2">
        <div className="bg-black text-white w-32 py-4 rounded-lg transition-transform hover:bg-black/[0.8] active:scale-90 flex items-center justify-center gap-2 font-medium shadow-md fixed bottom-5 right-5 cursor-pointer">
          <GoSignOut size={18} />
          <span>Logout</span>
        </div>
      </div>
      <div className="mt-10">
        <div className="bg-white -m-6 p-3 sticky top-0">
          <div className="flex flex-col items-center space-y-4">
            <span className="text-6xl md:text-6xl">📝</span>
            <h1 className="text-3xl md:text-4xl font-bold">ToooDooo&apos;s</h1>
          </div>
          <div className="flex items-center gap-2 mt-10">
            <input
              placeholder={`👋 Hello ${authUser?.name}, What to do Today?`}
              type="text"
              name="todo"
              className="font-semibold placeholder:text-gray-500 border-[2px] border-black h-[60px] w-full sm:w-auto grow shadow-sm rounded-md px-4 focus-visible:outline-yellow-400 text-lg transition-all duration-300"
              autoFocus
              value={todo}
              onChange = {handleChange}
            />
            <button onClick={addTodo} className="w-[60px] h-[60px] rounded-md bg-black flex justify-center items-center cursor-pointer transition-all duration-300 hover:bg-black/[0.8]">
              <AiOutlinePlus size={30} color="#fff" />
            </button>
          </div>
        </div>
        <div className="my-10">
          {allTodos.length > 0 && allTodos.map((todo, index) => (
            <div key={todo.id} className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-3">
                <input
                  id={`todo-${todo.id}`}
                  type="checkbox"
                  className="w-4 h-4 accent-green-400 rounded-lg"
                  checked={todo.completed}
                  onChange={(e) => handleUpdateChange(e, todo.id)}
                />
                <label htmlFor={`todo-${todo.id}`} className={`font-medium ${todo.completed ? "line-through": ""}  `}>
                  {todo.content}
                </label>
              </div>
              <div  id={`todo-${todo.id}`} className="flex items-center gap-3">
                <MdDeleteForever onClick={() => deteteTodoItem(todo.id)}
                  size={24}
                  className="text-red-400 hover:text-red-600 cursor-pointer"
                  
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
  
};

export default Home;
