import React, {useState} from 'react';
import {AgGridColumn, AgGridReact} from 'ag-grid-react';
import axios from "axios";
import { Header } from './Header';
import { Footer } from './Footer';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';  

export function PostalCodeGrid() {

    // set to default data
    const [rowData, setRowData] = useState();
    const [searchQuery, setSearchQuery] = useState("");
    const [colDefs, setColDefs] = useState([
        {field: 'postcode', headerName: 'Postal Code',  },
        {field: 'region'},
        {field: 'country'},
        {field: 'area'},
        {field: 'parliamentaryConstituency', headerName: 'Parliamentary Constituency', width: 250},
        {field: 'adminDistrict'},
    ]);

    const styles = {
        display: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      };
 

    React.useEffect(() => {
        const fetchData = async () => {
          const response = await axios.get(
            `https://g8w4x6soxi.execute-api.us-east-1.amazonaws.com/Prod/autocomplete/${searchQuery}`            
          );       
          console.log(response.data);   
          setRowData(response.data);  
        };
    
        if (searchQuery !== "") {
            setRowData("");
          fetchData();
        }
      }, [searchQuery]);
           
      const handleSearchSubmit = (event) => {
        event.preventDefault();
        // The API call will be made automatically in the useEffect hook when `searchQuery` changes
      };
    

   return (
    <form onSubmit={handleSearchSubmit}>
       
        <Header> 
      </Header>
          <input 
            type="text" placeholder="Please search postal code here"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          /> <br></br>
        
        
       <div className="ag-theme-alpine" style={{height: 600, width: 1250}}>   
           <AgGridReact
                defaultColDef={{sortable: true, filter: true }}
                pagination={true}
                rowData={rowData}
                columnDefs={colDefs}  
                overlayNoRowsTemplate={'<div>No data to display</div>'}
                >
           </AgGridReact>
       </div> 
       <Footer> 
      </Footer>
       </form>
   )
};