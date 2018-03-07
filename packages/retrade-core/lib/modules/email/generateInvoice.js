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
    <table style="width: 100%; border: none;">
      <tr>
        <td colspan="3"><b>ReTrade</b><p>Norway</p></td>
        <td><h1>INVOICE</h1><p># INV-000001</p><p>Balance Due</p><h3>${data.total / 100}</h3></td>
      </tr>
      
      <tr>
        <td colspan="2">Bill To <p>${data.user.username}</p></td>
        <td><p>Invoice Date:</p><p>Terms:</p><p>Due Date:</p></td>
        <td><p>${new Date().toLocaleDateString()}</p><p>NA</p><p>${new Date().toLocaleDateString()}</p></td>
      </tr>
      
      <tr style="background: #3C3D3A; color; white; padding: 5px">
        <td style="width: 10%">#</td>
        <td style="width: 50%">Item Name</td>
        <td style="width: 20%">Qty</td>
        <td style="width: 20%">Amount</td>
      </tr>
      
      ${data.order.map(o=> {
        i++;
          return `
          <tr>
            <td>${i}</td>
            <td>${o.item.itemName}</td>
            <td>${1}</td>
            <td>${o.amt}</td>
          </tr>  
          `
      })}
      
      <tr>
        
      </tr>
      
    </table>

     
  
  `
};

export default generateInvoice;
