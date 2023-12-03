import { useEffect, useState } from "react";
import UserData from "./components/UserData.jsx";
import "./App.css"
import { MdDelete } from "react-icons/md";
import SearchBar from "./components/SearchBar.jsx";
import ReactPaginate from "react-paginate";

const API = "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";



const App = ()=> {
  const [users,setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRows, setSelectedRows] = useState(users);
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 10;
  const pagesVisited = pageNumber*usersPerPage;
  const pageCount = Math.ceil(users.length/usersPerPage);

  const handleUpdateUsers = (updatedUsers) => {
    setUsers(updatedUsers);
  };
  const changePage = ({selected})=>{
    setPageNumber(selected);
  };
  const fetchUsers = async(url)=>{
    try{
       const res = await fetch(url);
       const data = await res.json();
       if(data.length > 0){
        setUsers(data);
       }
       console.log(data);
    }catch(e){
      console.error(e)
    }
  };

  useEffect(()=>{
    fetchUsers(API);
}, []);

  const handleSearch= (term)=>{
    setSearchTerm(term);
    
  };
  const handleSelectRow = (userId) => {
    const updatedSelectedRows = [...selectedRows];
    const index = updatedSelectedRows.indexOf(userId);

    if (index !== -1) {
      updatedSelectedRows.splice(index, 1);
    } else {
      updatedSelectedRows.push(userId);
    }

    setSelectedRows(updatedSelectedRows);
  };

  const handleDeleteSelected = () => {
    setUsers((prevUsers) =>
      prevUsers.filter((user) => !selectedRows.includes(user.id))
    );
    // Clear the selected rows
    setSelectedRows([]);
    
  };
  


   
  return <>
  
    <div className= "search-bar-container">
    <SearchBar onSearch={handleSearch}/>
    <button className="delete-bttn" onClick={handleDeleteSelected}><MdDelete icon={MdDelete}/></button>
    </div>
     <div className= "App">
     <table>
      <thead>
        <tr>
        <th className="column1">Select</th>
        <th className="column1">Name</th>
        <th className="column1">Email</th>
        <th className="column1">Role</th>
        <th className="column1Action">Action</th>
        </tr>
      </thead>
      <tbody>
        
        <UserData users={users.filter((user)=>user.name.includes(searchTerm) || user.email.includes(searchTerm) || user.role.includes(searchTerm)).slice(pagesVisited, pagesVisited + usersPerPage)} selectedRows={selectedRows}
              onSelectRow={handleSelectRow}
              onDeleteSelected={handleDeleteSelected}
              onUserDataState={handleUpdateUsers}/>
      </tbody>
     </table>
     
     <ReactPaginate
           previousLabel = {"Previous"}
           nextLabel = {"Next"}
           pageCount = {pageCount}
           onPageChange = {changePage}
           containerClasssName = {"paginationBttns"}
           previousLinkClassName = {"previousBttn"}
           nextLinkClassName = {"nextBttn"}
           disabledClassName = {"paginationDisabled"}
           activeClassName = {"paginationActive"}
       />
       
     </div>
   </>
}

export default App;

