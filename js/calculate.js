$(document).ready(function(){
    var input;
    $('#list_title').hide();
    $('#reset').hide();
    $('#pdf_but').hide();
    
    $('#sq_feet').keyup(function(event) {

      // skip for arrow keys
      if(event.which >= 37 && event.which <= 40) return;

      // format number
      $(this).val(function(index, value) {
        return value
        .replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        ;
      });
    });
    $('#reset').click(function(){
        $('#container').html('');
        $('#high').html('');
        $('#list').html('');
        $('#list_title').hide();
        $('#inputs').show();
        $('#reset').hide();
        $('#pdf_but').hide();
    });
        
    $('#calculate').click(function(){
            $('#container').html('');
            $('#list').html('');
            $('#inputs').hide();
            $('#pdf_but').show();
            var addit = function addCommas(x) {
                var parts = x.toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                return parts.join(".");
            }   
            
            var design_percent = 0.05;
            $('#high').append('<div id="container" style="min-width: 250px; height: 400px; max-width: 800px; margin: 0 auto"></div>');
            $('#reset').show();
            
            var sqft = $('#sq_feet').val();
            sqft = sqft.replace(/,/g, "");
            job = $('#job_name').val();
            
            //Get Job Type Id From Dropdown
            var type_id = $('#job_type option:selected').val();
            var type_name = $('#job_type option:selected').text();
            console.log(type_id);
            var cost_per_sqft;
            var markup_factor;
            var general_conditions_factor = 0.15;
            var management_fee_factor = 0.60;
            var profit_factor = 0.20;
            var percent_by_type = function(){
                if (type_id == 1) {
                    site_work_share = 0.09;
                    foundation_share = 0.08;
                    framing_share = 0.21;
                    exterior_finishes_share = 0.12;
                    major_systems_share = 0.14;
                    interior_finishes_share = 0.31;
                    final_steps_share = 0.05;
                    type_title = "Major Renovation";
                    cost_per_sqft = 140.00;
                    markup_factor = 1.20;
                    margin = 20;
                } else if ( type_id == 2) {
                    site_work_share = 0.05;
                    foundation_share = 0.05;
                    framing_share = 0.21;
                    exterior_finishes_share = 0.10;
                    major_systems_share = 0.18;
                    interior_finishes_share = 0.39;
                    final_steps_share = 0.01;
                    type_title = "Addition";
                    cost_per_sqft = 150.00;
                    markup_factor = 1.20;
                    margin = 20;
                } else if ( type_id == 3 ) {
                    site_work_share = 0.04;
                    foundation_share = 0.05;
                    framing_share = 0.13;
                    exterior_finishes_share = 0.14;
                    major_systems_share = 0.22;
                    interior_finishes_share = 0.40;
                    final_steps_share = 0.01;
                    type_title = "Remodel";
                    cost_per_sqft = 130.00;
                    markup_factor = 1.25;
                    margin = 25;
                }
            }
            percent_by_type();
            
           
            
            
                
             //Cost and markup
            var cost = sqft * cost_per_sqft;
            var cost_comma = addit(cost);
            var total_cost = Math.round(cost * markup_factor);
            var total_cost_comma = addit(total_cost);
            var markup = total_cost - cost;  
            var design_fee = Math.round(markup * design_percent);

            var check_fee = function(){
                if (design_fee < 5000) {
                    console.log("design fee raised to 5000");
                    design_fee = 5000;
                    markup_less = markup - 5000;
                    general_conditions_factor = 0.20;
                    general_conditions = Math.round(markup_less * general_conditions_factor);
                    management_fee = Math.round(markup_less * management_fee_factor);
                    profit = Math.round(markup_less * profit_factor);


                } else {
                    design_fee = Math.round(markup * design_percent);
                    general_conditions = Math.round(markup * general_conditions_factor);
                    management_fee = Math.round(markup * management_fee_factor);
                    profit = Math.round(markup * profit_factor);
                }
            };
            check_fee();

            var general_conditions_comma = addit(general_conditions);
            var management_fee_comma = addit(management_fee);
            var profit_comma = addit(profit);
            var final_sqft = Math.round(total_cost / sqft);
            var design_fee_comma = addit(design_fee);
            var markup_comma = addit(markup);
            
            
            
            
            //Categorical Calculations
            var site_work = Math.round(total_cost * site_work_share);
            var site_work_comma = addit(site_work);
            var foundation = Math.round(total_cost * foundation_share);
            var foundation_comma = addit(foundation);
            var framing = Math.round(total_cost * framing_share);
            var framing_comma = addit(framing);
            var exterior_finishes = Math.round(total_cost * exterior_finishes_share);
            var exterior_finishes_comma = addit(exterior_finishes);
            var major_systems = Math.round(total_cost * major_systems_share);
            var marjor_systems_comma = addit(major_systems);
            var interior_finishes = Math.round(total_cost * interior_finishes_share);
            var interior_finishes_comma = addit(interior_finishes);
            var final_steps = Math.round(total_cost * final_steps_share);
            var final_steps_comma = addit(final_steps);

            $('#list').append('<hr>');
            $('#list').append('<span style="font-weight:bold; font-size: 24px">' + type_name + ' @ $' + final_sqft + '-sf including ' + margin + '% mark-up</span><hr>');
            $('#list').append('<div class="well"><span style="font-weight: bold; font-size: 24px;"></span><ul><li>Our Cost: <span class="right">$' + cost_comma + '</span><ul><li>Cost-sf: <span class="right">$' + cost_per_sqft + '</span></li></ul></li><hr><li>Mark-up: <span class="right">$'  + markup_comma + '</span><hr><ul><li>Overhead: <span class="right">$' + management_fee_comma + '</span></li><li>Profit: <span class="right">$' + profit_comma + '</span></li><li>General Conditions: <span class="right">$' + general_conditions_comma + '</span></li><li>Design Fee: <span class="right">$' + design_fee_comma + '</span></li></ul></li><hr><li>Client Cost: <span class="right">$' + total_cost_comma + '</span></li><hr></ul></div>');
            $('#list').append('Site Work: <span class="right">$' + site_work_comma + '</span>');
            $('#list').append('<hr>');
            $('#list').append('Foundation: <span class="right">$' + foundation_comma + '</span>');
            $('#list').append('<hr>');
            $('#list').append('Framing: <span class="right">$' + framing_comma + '</span');
            $('#list').append('<hr>');
            $('#list').append('Exterior Finishes: <span class="right">$' + exterior_finishes_comma + "</span>");
            $('#list').append('<hr>');
            $('#list').append('Major Systems: <span class="right">$' + marjor_systems_comma + '</span>');
            $('#list').append('<hr>');
            $('#list').append('Interior Finishes: <span class="right">$' + interior_finishes_comma + '</span>');
            $('#list').append('<hr>');
            $('#list').append('Final Steps: <span class="right">$' + final_steps_comma + '</span>');


            
            input = $('#sq_feet').val();
            
            $('#list_title').show();
            
            $('#container').highcharts({
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: '<span style="font-weight: bold;">' + job + ' Rough Estimate $' + total_cost_comma + '</span>'
                },
                tooltip: {
                    pointFormat: ' <b>{point.percentage:.1f}%</b><br><b>${point.y}</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>:<br> <b>${point.y}</b>',
                            style: {
                                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                            }
                        }
                    }
                },
                series: [{
                    name: 'Allocation',
                    colorByPoint: true,
                    data: [{
                        name: 'Site Work',
                        y: site_work
                    }, {
                        name: 'Foundation',
                        y: foundation
                    }, {
                        name: 'Framing',
                        y: framing
                    }, {
                        name: 'Exterior Finishes',
                        y: exterior_finishes
                    }, {
                        name: 'Major Systems',
                        y: major_systems
                    }, {
                        name: 'Interior Finishes',
                        y: interior_finishes,
                        sliced: true,
                        selected: true
                    }, {
                        name: 'Final Steps',
                        y: final_steps
                    }]
                }]
            });

        });    
});