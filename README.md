# PermGen
Application uses mathematical algorithms to generate all possible combinations of specified number of even and odd numbers. 
<br>Example:<br>
<table  style="border:1px solid black;display:inline-block">
<tr>
  <td colspan=2>Input:</td>
  <td colspan=2>1,2,3,4,5,6,7,8,9,10</td>
</tr>
<tr>
  <td>Even:</td>
  <td>2</td>
  <td>Odd:</td>
  <td>3</td>
</tr>
<tr>
  <td colspan=4>Output:</>
</tr>
<tr>
  <td colspan=2>Even</>
  <td colspan=2>Odd</>
</tr>
<tr>
  <td colspan=2>24<br>26<br>28<br>210</>
  <td colspan=2>13<br>15<br>17<br>19</>
</tr>
</table>

<table  style="border:1px solid black;display:inline-block">
<tr>
  <td colspan=2>Input:</td>
  <td colspan=2>1,2,3</td>
</tr>
<tr>
  <td>Even:</td>
  <td>2</td>
  <td>Odd:</td>
  <td>2</td>
</tr>
<tr>
  <td colspan=4>Output:</>
</tr>
<tr>
  <td colspan=4>Error:not enough even numbers in the input</>
</tr>

</table>

# Tech
Runs on Node server, wrapped in electron distributive using electron-packager
