import React, { useState } from 'react';
import axios from 'axios';
import * as xlsx from 'xlsx';
function ResultDownload() {
  const [searchText, setSearchText] = useState('');
  const [collections, setCollections] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    try {
      const response = await axios.post('http://localhost:5000/searchCollections', { searchText });
      setCollections(response.data);
      console.log(response.data);
      setSearched(true); // Set searched to true after performing the search
    } catch (error) {
      console.error('Error searching collections:', error);
    }
  };

    const handleDownload = async () => {
    try {
      // Convert collections data to Excel
      const workbook = xlsx.utils.book_new();
      const worksheet = xlsx.utils.json_to_sheet(collections);
      xlsx.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
      const excelBuffer = xlsx.write(workbook, { type: 'array', bookType: 'xlsx' });
      
      // Create a blob object from the Excel data
      const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      
      // Create a temporary URL for the blob object
      const url = window.URL.createObjectURL(blob);
      
      // Create a link element to trigger the download
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'collections.xlsx'); // Specify the file name here
      
      // Append the link to the document body and trigger the click event
      document.body.appendChild(link);
      link.click();
      
      // Remove the link and revoke the URL to free up memory
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading collection:', error);
    }
};

  

  return (
    <div>
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Enter search text"
      />
      <button onClick={handleSearch}>Search</button>

      {searched && collections.length === 0 ? (
        <p>No collections found for the entered search text.</p>
      ) : null}

      {collections.length > 0 ? (
        <div>
          <div>
              <button onClick={() => handleDownload()}>Download</button>
            </div>
        </div>
      ) : null}
    </div>
  );
}

export default ResultDownload;