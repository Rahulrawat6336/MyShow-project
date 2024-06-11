$(document).ready(function () {
    $.getJSON('http://localhost:3000/states/fetch_all_states',
        function (response) {
            console.log("DATA",response.data)
            response.data.map((item) => {
                $('#stateid').append($('<option>').text(item.statename).val(item.stateid))
            })
        })

        $('#stateid').change(function () {
            $.getJSON('http://localhost:3000/states/fetch_all_city',{stateid:$('#stateid').val()},
                function (response) {
                    $('#cityid').empty()
                    $('#cityid').append($('<option>').text('-select city-'))

                    console.log("DATA",response.data)
                    response.data.map((item) => {
                        $('#cityid').append($('<option>').text(item.cityname).val(item.cityid))
                    })
                })
            })

            $('#cityid').change(function(){
                $.getJSON('/states/fetch_all_cinema',{cityid:$('#cityid').val()},function(response){
                    $('#cinemaid').empty()
                    $('#cinemaid').append($('<option>').text('-select cinema-'))
                    console.log("DATA",response.data)
                    response.data.map((item)=>{
                        $('#cinemaid').append($('<option>').text(item.cinemaname).val(item.cinemaid))
                    })
                })
            })
            
            $('#cinemaid').change(function(){
                $.getJSON('/states/fetch_all_screen',{cinemaid:$('#cinemaid').val()},function(response){
                    $('#screenid').empty()
                    $('#screenid').append($('<option>').text('-select screen-'))
                    console.log("DATA",response.data)
                    response.data.map((item)=>{
                        $('#screenid').append($('<option>').text(item.screenname).val(item.screenid))
                    })
                })
            })

            $('#picture').change(function(e){
                console.log('xxx',e)
                $('#moviepicture').attr('src',URL.createObjectURL(e.currentTarget.files[0]))
            })
})


