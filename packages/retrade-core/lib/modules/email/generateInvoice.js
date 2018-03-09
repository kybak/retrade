const
  flexColumn = `display: flex; flex-direction: column;`,
  flexRow = `display: flex; flex-direction: column;`,
  justifyCenter = `justify-content: center;`,
  justifyEnd = `justify-content: flex-end;`,
  alignCenter = `align-items: center;`,
  alignEnd = `align-items: flex-end;`,
  fullWidth = `width: 100%;`,
  header = `background: #3C3D3A; color: white;`,
  tableRow = `padding: 5px; border-bottom: thin solid lightgray;`;

const generateInvoice = (data) => {
  let i=0;
  return `
    <table style="width: 100%; border: none; margin: 0">
      <tr>
        <td><b>ReTrade</b><br>Norway</td>
        <td colspan="2" align="right"><h1>INVOICE</h1><p># INV-000001</p><p>Balance Due</p><h3>${data.total / 100}</h3></td>
      </tr>
      
      <tr>
        <td width="50%">Bill To <br><b>${data.user.username}</b></td>
        <td width="25%"><p>Invoice Date:</p><p>Terms:</p><p>Due Date:</p></td>
        <td align="right" width="25%"><p>${new Date().toLocaleDateString()}</p><p>NA</p><p>${new Date().toLocaleDateString()}</p></td>
      </tr>
      </table>
      
      <table style="width: 100%; border: none; margin: 0">
      <tr style="background: #3C3D3A; padding: 5px">
        <td width="10%" style="color: white">#</td>
        <td width="50%" style="color: white">Item Name</td>
        <td width="20%" style="color: white">Qty</td>
        <td width="20%" style="color: white">Amount</td>
      </tr>
      
      ${data.order.map(o=> {
        i++;
          return `
          <tr>
            <td width="10%" style="color: gray">${i}</td>
            <td width="50%" style="color: gray">${o.itemName}</td>
            <td width="20%" style="color: gray">${1}</td>
            <td width="20%" style="color: gray">$${(o.amt / 100).toFixed(2)}</td>
          </tr>  
          `
      })}
      
      <tr>
        
      </tr>
      
    </table>

     
  
  `
};

export default generateInvoice;
