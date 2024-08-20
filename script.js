
const  boxes=document.querySelector(".boxes");
async function mypi(keyword = "development") {
    try {
      const jobsApi = await fetch(`https://backend-prod.app.hiringmine.com/api/jobAds/all?limit=1000&pageNo=1&keyWord=${keyword}`);
      if (!jobsApi.ok) {
        throw new Error(`API returned ${jobsApi.status} ${jobsApi.statusText}`);
      }
      const jobs = await jobsApi.json();
      console.log(jobs);
  boxes.innerHTML="";
     for(let i=0;i<jobs.data.length;i++){
        if(jobs.data[i].companyName==""){
            continue;
        }
        boxes.innerHTML+=`
        <div class="box" id=${jobs.data[i].category.id}>
                        <div class="box-content flex-column d-flex justify-content-between">
                            <div class="box-header d-flex justify-content-between">
                                <p>${jobs.data[i].companyName}</p> 
                                
                                <img src="job.png" alt="" width="45px">
                            </div>
                            <p>${jobs.data[i].designation}</p>
<span>
  ${jobs.data[i].payRangeStart === null || jobs.data[i].payRangeEnd === null ? "No Salary Mentioned" : `${jobs.data[i].payRangeStart} - ${jobs.data[i].payRangeEnd}`}
</span>                           <div class="box-footer d-flex justify-content-between mt-5">
                                <p>
                                ${jobs.data[i].city=="" && jobs.data[i].country=="" ? "":`${jobs.data[i].city} ${jobs.data[i].country}`}
                                </p>
                                <p class="fw-light">
                                 ${jobs.data[i].views} views
                                </p>
                                
                            </div>
                        </div>
                    </div>
        
        `
        
        
     }

    } catch (error) {
      console.error(error);
    }
  }
  
  const searchInput = document.getElementById("search_input");
  const searchBtn = document.getElementById("search_btn");
  
  if (searchInput && searchBtn) {
    searchBtn.addEventListener("click", async function (e) {
      e.preventDefault();
      const searchQuery = searchInput.value.trim();
      if (searchQuery) {
        await mypi(searchQuery);
      } else {
        console.log("Please enter a search query");
      }
    });
  } else {
    console.log("Error: searchInput or searchBtn not found");
  }


mypi();







  