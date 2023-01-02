using GSL.DataContext.Entity;
using GSL.Service.Interface;
using GSL.VModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace GSL.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class LeadsController : ControllerBase
    {
        private readonly ILeadsService _leadsService;
        public LeadsController(ILeadsService leadsService)
        {
            _leadsService = leadsService;

        }
        //get all leads
        [HttpGet]
        public async Task<IActionResult> GetLeads()
        {
            var leadAll = _leadsService.GetLeads();
            return Ok(leadAll);
        }



        //add single Lead
        [HttpPost]
        public async Task<IActionResult> AddLead([FromBody] LeadVM lead)
        {
            try
            {
                var data = new Lead
                {
                  
                    Cname = lead.Cname,
                    Cnumber = lead.Cnumber,
                    Caddress = lead.Caddress,
                    Cemail = lead.Cemail,
                    Coccupation = lead.Coccupation,
                    Cdesignation = lead.Cdesignation,
                    AddedBy = "test",//HttpContext.User.FindFirstValue("Id"),

                };
                await _leadsService.Add(data);
                return CreatedAtAction(nameof(AddLead), lead.Id, lead);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            
        }



    }
}
