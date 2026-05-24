const KROWD_MENU_URL = "https://api.getkrowd.com/v3/menu/index.cfm?companyId=1110&apiKey=krwd_fd6a9bdbc7c6adb43d3f6f1ba812c4a2365f9ea520de24f81c3969e91ac";
    function toggleDrawer(){
      var d=document.getElementById('mobileDrawer');
      var h=document.getElementById('hamburger');
      var open=d.classList.toggle('open');
      h.classList.toggle('open',open);
      document.body.style.overflow=open?'hidden':'';
    }
    document.addEventListener('click',function(e){
      var d=document.getElementById('mobileDrawer');
      var h=document.getElementById('hamburger');
      if(d&&d.classList.contains('open')&&!d.contains(e.target)&&!h.contains(e.target)){
        d.classList.remove('open');h.classList.remove('open');document.body.style.overflow='';
      }
    });