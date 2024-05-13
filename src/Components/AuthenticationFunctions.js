//To Check and confirm whether the user is loggedIn
export const isAuthenticated=()=>
    {
      const loggedUser=localStorage.getItem("authenticatedUser");
      if(loggedUser === null)
        {
          return false;
        }
        else
        {
          return true;
      }
    };

//To toggle password visibility
export const showPassword1=()=>{
  var field1=document.getElementById("floatingPassword1");
  var icon1=document.getElementById("icon1");
  var list1=icon1.classList;
  if(list1.contains("fa-eye-slash"))
  {
    list1.remove("fa-eye-slash");
    list1.add("fa-eye");
    field1.type="text";
  }
  else
  {
    list1.remove("fa-eye");
    list1.add("fa-eye-slash");
    field1.type="password";
  }
}

  