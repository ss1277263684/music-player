<!-- <transition name="back"> -->
    <template>
        <div id="play">
            <mt-header :title="song_name">
                <router-link to="" slot="left">
                    <mt-button icon="back" @click.native="$router.back(-1)"></mt-button>
                </router-link>
                <mt-button slot="right"><img src="../../assets/play/share.png"></mt-button>
            </mt-header> 
            <div class="lyric_con">
                <div class="lyric" :class="{stop: !song_pic_animation, lyric_bg: song_pic}">
                    <img v-show="song_pic" :src="song_pic"   class="pic_animation">
                </div>
                <div class="stylus" v-show="song_pic" :class="{stop_stylus: !song_pic_animation}"></div>
            </div>   
            
            <div class="audio_con">
                <audio :src="song_url" ref="song" @canplay="get_total_time" @timeupdate="get_current_time" @play="play" @pause="pause" @ended="auto_play" loop autoplay>
                </audio>
                <div class="audio_button">
                    <span><img :src="love_img" class="love_btn" @click="love_the_song"></span>
                    <span><img :src="img_url.download" class="download_btn"></span>
                    <span></span>
                    <span>
                        <router-link :to="{ name: 'comment'}">
                            <img :src="img_url.comments" class="comments_btn"> 
                        </router-link>
                    </span>
                    <span><img :src="volume_img" class="volume_btn" @click="control_volume"></span>
                </div>
                <div class="progress_bar">
                    <span class="current_time">{{current_time | filter}}</span>
                    <div @mousedown="change_progress_bar">
                        <span class="progress_line" ref="progress_bar"></span>
                        <span class="progress_dot"></span>
                    </div>
                    <span class="total_time">{{total_time | filter}}</span>
                </div>
                <div class="audio_button">
                    <span><img :src="loop_img" class="loop_btn" @click="tab_loop_way"></span>
                    <span><img :src="img_url.prev" class="prev_btn" @click="prev_song"></span>
                    <span><img :src="is_playing_src" class="play_btn" @click="is_playing"></span>
                    <span><img :src="img_url.next" class="next_btn" @click="next_song"></span>
                    <span><img :src="img_url.menu" class="menu_btn" @click.stop="show_song_menu"></span>
                </div>
            </div>
            <div class="songs_menu_con" v-show="is_show_menu" @click="close_song_menu">
                 <div class="songs_menu" @click.stop>
                    <h3>当前播放(<i>{{songs_list.length}}</i>)</h3>
                    <ul class="songs_list">
                        <li  v-for="(item, index) in songs_list" >
                            <span :class="{is_playing_song: index == songs_index}" class="song_name_of_menu" @click="play_song_of_menu(index)">{{ item.name }}-<i>{{item.artists[0].name}}</i></span> 
                            <span class="clear_song_of_menu">清除</span>
                        </li>
                    </ul> 
                    <div class="close_menu"><span @click="close_song_menu">关闭</span></div>
                </div>   
            </div>
            
        </div>
    </template>
<!-- </transition> -->
<script>
    var img_url ={
        loop: require("../../assets/play/loop.png"),
        loop_all: require("../../assets/play/loop_all.png"),
        prev: require("../../assets/play/prev.png"),
        next: require("../../assets/play/next.png"),
        menu: require("../../assets/play/menu.png"),
        play: require("../../assets/play/play.png"),
        stop: require("../../assets/play/stop.png"),
        love: require("../../assets/play/love.png"),
        red_love: require("../../assets/play/red_love.png"),
        download: require("../../assets/play/download.png"),
        comments: require("../../assets/play/comments.png"),
        volume: require("../../assets/play/volume.png"),
        volume_x: require("../../assets/play/volume_x.png")
    }
    export default {
        name: 'Play',
        data(){
            return {
                song_info: "",                  // 歌曲信息
                song_id: "",                    // id
                song_url: "",                   // 歌曲的在线链接
                song_name: "",                  // 歌名
                song_pic: "",                   // 封面
                current_time: "",               // 当前音乐
                total_time: "",                 // 音乐时长
                crrent_volume: 0,               // 当前音量
                love_music_id_list: [],         // 喜爱的音id列表
                img_url: img_url,               // button的imgurl
                is_playing_src: img_url.play,   // 播放/停止的图片
                loop_img: img_url.loop,         // 循环方式图片
                love_img: img_url.love,             // 爱心收藏图片
                volume_img: img_url.volume,     // 音量图片
                song_pic_animation: false,      // 是否播放封面旋转动画
                is_show_menu: false,            // 是否显示歌单
            }
        },
        methods:{
            is_playing(e){
                if (this.$refs.song.currentSrc !== "") {
                    if(this.$refs.song.paused){
                        this.$refs.song.play()
                    }else{
                        this.$refs.song.pause()
                    }
                }
            },
            play(){
                this.song_pic_animation = true;
                this.is_playing_src = this.img_url.stop;
            },
            pause(){
                this.song_pic_animation = false;      
                this.is_playing_src = this.img_url.play;
            },
            tab_loop_way(){
                if(this.$refs.song.loop){
                    this.$refs.song.loop = false;
                    this.loop_img = img_url.loop_all;
                }else{
                    this.$refs.song.loop = true;
                    this.loop_img = img_url.loop;
                }
            },
            auto_play(){
                if(!this.$refs.song.loop){
                    this.next_song()
                }
            },
            next_song(){
                if(this.songs_list.length){
                    if(this.songs_index  >= this.songs_list.length - 1){
                        this.$store.dispatch("change_song_index", 0);
                        this.get_song_info();
                    }else{
                        this.$store.dispatch("change_song_index", this.songs_index + 1);
                        this.get_song_info();   
                    }    
                }
            },
            prev_song(){
                if(this.songs_list.length){
                    var data = this.songs_index;
                    if(data == 0){
                        this.$store.dispatch("change_song_index", this.songs_list.length-1);
                        this.get_song_info();
                    }else{
                        this.$store.dispatch("change_song_index", this.songs_index-1);
                        this.get_song_info();
                    }    
                }
            },
            show_song_menu(){
                this.is_show_menu = true;
            },
            close_song_menu(){
                this.is_show_menu = false;
            },
            play_song_of_menu(id){
                this.$store.dispatch("change_song_index", id);
                this.get_song_info();
            },
            love_the_song(){
                if(this.love_img == img_url.love){
                    this.love_img = img_url.red_love
                    this.collect_song();
                }else{
                    this.love_img = img_url.love
                    this.cancel_collect()
                }
            },
            collect_song(){
                if(localStorage.getItem("love_music")){
                    var data = JSON.parse(localStorage.getItem("love_music"));
                    data.push(this.songs_list[this.songs_index]);
                    localStorage.setItem("love_music",JSON.stringify(data))
                    this.$store.dispatch("change_love_music", data);
                }else{
                    var data = [];
                    data.push(this.songs_list[this.songs_index]);
                    localStorage.setItem("love_music",JSON.stringify(data));
                    this.$store.dispatch("change_love_music", data)
                }
                this.get_love_music_id_list();
            },
            cancel_collect(){
                var data = JSON.parse(localStorage.getItem("love_music"));
                var index = this.love_music_id_list.indexOf(this.song_id);
                data.splice(index,1);
                localStorage.setItem("love_music",JSON.stringify(data));
                this.$store.dispatch("change_love_music", data);
                this.get_love_music_id_list();
            },
            control_volume(){
                if(this.$refs.song.volume){
                    this.crrent_volume = this.$refs.song.volume;
                    this.$refs.song.volume = 0;
                    this.volume_img = img_url.volume_x;
                }else{
                    this.volume_img = img_url.volume;
                    this.$refs.song.volume = this.crrent_volume;
                }
            },
            get_total_time(){
                this.total_time = this.$refs.song.duration;
            },
            get_current_time(){
                this.current_time = this.$refs.song.currentTime;
                this.set_progress();
            },
            set_progress(){
                var length = 100*this.current_time/this.total_time + "%";
                this.$refs.progress_bar.style.width = length;
            },
            change_progress_bar(e){
                this.$refs.progress_bar.style.width = e.clientX -40 + "px";
                this.$refs.song.currentTime = this.total_time*((e.clientX-40)/(this.$refs.progress_bar.parentNode.clientWidth)); 
                this.play();
            },
            get_song_info(){ 
                this.song_info = this.songs_list[this.songs_index];
                this.song_id = this.song_info.id
                this.song_name = this.song_info.name;
                var get_song_url = () => {
                    return this.$axios.get('song/url?id='+ this.song_id);
                }
                var get_song_pic = () => {
                    return this.$axios.get('song/detail?ids=' + this.song_id);
                }
                this.$axios.all([get_song_url(), get_song_pic()])
                .then(this.$axios.spread((acct, perms)=> {
                    this.song_url = acct.data.data[0].url;
                    this.song_pic = perms.data.songs[0].al.picUrl;
                    this.$store.dispatch('change_song_pic', this.song_pic) 
                }));
                if(this.love_music_id_list.indexOf(this.song_id) !== -1 ){
                    this.love_img = img_url.red_love
                }else{
                    this.love_img = img_url.love
                }
            },
            get_love_music_id_list(){
                this.love_music_id_list = [];
                for(let i = 0; i < this.love_music.length; i++){
                    this.love_music_id_list.push(this.love_music[i].id)
                }
            }
        },
        computed: {
            songs_list(){
                return this.$store.state.song_list;
            },
            songs_index(){
                return this.$store.state.song_index;
            },
            love_music(){
                return this.$store.state.love_music;
            }
        },
        filters: {
            filter(t){
                var m = Math.floor(t/60);
                var s = Math.round(t%60);
                m = m<10?("0" + m) : m;
                s = s<10?("0" + s) : s;
                return m + ":" + s
            } 
        },
        created(){ 
            console.log("开始创建play组件")
        },
        activated(){
            console.log("激活play组件")
            if(!this.love_music.length && localStorage.getItem("love_music")){
                var data = JSON.parse(localStorage.getItem("love_music"));
                this.$store.dispatch('change_love_music',data);
            }
            if(this.songs_list.length){ 
                this.get_love_music_id_list()
                this.get_song_info();
                if(this.$refs.song.paused){
                    this.pause();
                }else{
                    this.play();
                }    
            }else{
                this.$store.dispatch('change_song_list', this.love_music);
                this.$store.dispatch('change_song_index', 0);
                this.get_love_music_id_list()
                this.get_song_info();
                if(this.$refs.song.paused){
                    this.pause();
                }else{
                    this.play();
                }
            }
            
        }
    }
</script>

<style scoped>
    #play{
        width: 100%;
        height: 100%;
        background: url(../../assets/play/bg.png) no-repeat 0px 0px;
        background-size: cover;
        overflow: hidden;
    }
    .mint-header{
        font-size: 20px;
        background-color: transparent;
        padding-top: 10px;
        height: 10%
    }
    .mint-header .mint-button{
        text-indent: 10px
    }
    .mint-button-text img{
        width: 24px;
        margin-right: 10px;
    }

    .lyric_con{
        height: 60%;
        width: 100%;
    }
    .lyric{
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
    }
    .lyric_bg{
        background: url(../../assets/play/pic_border.png) no-repeat 50%;
        background-size: 294px;transform: rotate(0deg);
        animation: pic 2s linear infinite
    }
    @keyframes pic{
        100%{
            transform:rotate(360deg);
        }
    }
    .stop{
        animation-play-state: paused;
    }
    .pic_animation{
        width: 200px;
        height: 200px;
        margin: 0 auto;
        border-radius: 50%;
    }
    
    @media only screen and ( min-height: 800px) and ( max-height: 850px){
        .stylus{
            width: 162px;
            height: 304px;
            position: absolute;
            left: 28.5%;
            top: -69px;
            background: url(../../assets/play/stylus.png) no-repeat;
            background-size: contain;
            transition: all .3s ;
            transform: rotate(0deg);
        }
        .stop_stylus{
            transition: all .3s;
            transform: rotate(-45deg);
        }     
    }

    .audio_con{
        height: 30%;
        width: 100%;
        padding-bottom: 20px;
        display: flex;
        flex-direction: column;
    }
    .progress_bar{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
    .progress_bar div{
        height: 1px;
        background: #fff;
        width: 76%;
        display: flex;
    }
    .progress_line{
        display: inline-block;
        background-color: #b82525;
        width: 0px;
        height: 5px;
        position: relative;
        top: -2px;
    }
    .progress_dot{
        display: inline-block;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background-color: #b82525;
        position: relative;
        top: -8px;
        border: 6px solid #fff;
    }
    .current_time,.total_time{
        color: #fff;
        font-size: 12px;
        transform: scale(1);
    }
    .audio_button{
        width: 100%;
        height: 20%;
        display: flex;
        justify-content: space-around;
        margin: 7% 0;
        align-items: center;
    }
    .audio_button span{
        display: inline-block;
        width: 20%;
        height: 20px;
    }
    .love_btn, .download_btn, .comments_btn, .volume_btn{
        width: 20px;
    }
    .loop_btn,.prev_btn, .next_btn, .menu_btn{
        width: 20px;
        height: 20px;
    }
    .play_btn{
        width: 50px;
        height: 50px;
        margin-top: -15px;
    }

    .songs_menu_con{
        width: 100%;
        height: 100%;
        background-color: #ddddddb8;
        position: absolute;
        top: 0px;
    }
    .songs_menu{
        width: 90%;
        height: 475px;
        position: absolute;
        bottom:20px;
        left: 5%;
        overflow: hidden;
        color: #fff;
        background: #272727;
        border-radius: 20px;
    }
    .songs_list{
        height: 365px;
        overflow: auto;
    }
    .songs_list li{
        width: 90%;
        height: 36px;
        line-height: 36px;
        border-bottom: 1px solid #3a3a3a;
        margin-left: 5%;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
    }
    .songs_list li span{
        display: inline-block;
    }
    .songs_list li i{
        font-style: normal;
        font-weight: 100;
        font-size: 13px;
    }
    .song_name_of_menu{
        width: 80%;
        text-align: left;
    }
    .clear_song_of_menu{
        width: 20%
    }
    .close_menu{    
        height: 50px;
        line-height: 50px;
    }
    .is_playing_song{
        color: #b82525;
    }
</style>