Set oShell = CreateObject("WScript.Shell")
Do
  x = Int((500 - 100 + 1) * Rnd + 100)
  y = Int((500 - 100 + 1) * Rnd + 100)
  oShell.SendKeys "{F15}"
  Set WshShell = WScript.CreateObject("WScript.Shell")
  Set oMouse = CreateObject("WScript.Shell")
  oMouse.SendKeys "^{ESC}"
  WScript.Sleep 1000
Loop
