import React from "react";
import axiosInstance from '../../connetion/axios';
import DatePicker from 'react-datepicker2';
import momentJalaali from 'moment-jalaali';
import StyledForm from "../../styled-components/StyledForm";
import StyledMyProfile from "../../styled-components/StyledMyProfile";
import HomePageLink from "../HomePageLink";
import MenuLink from "../MenuLink";
import ChangePassword from "../ChangePassword";
import UploadFile from "../UploadFile";

import uploadIcon from "../../assets/images/upload-1.png"
import calendarIcon from "../../assets/images/011-calendar.png"
import arrowBottom from "../../assets/images/arrowBottom.png";
import telegram from "../../assets/images/social icons/telegram-1@2x.png";
import whatsapp from "../../assets/images/social icons/whatsapp-1@2x.png";
import mail from "../../assets/images/social icons/mail-1@2x.png";
import instagram from "../../assets/images/social icons/instagram-1@2x.png";
import facebook from "../../assets/images/social icons/facebook-1@2x.png";
import youtube from "../../assets/images/social icons/youtube-1@2x.png";
import twitter from "../../assets/images/social icons/twitter-1@2x.png";


export default class MyProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: "",
            first_name: "",
            last_name: "",
            date_of_birth: momentJalaali(),
            birth_order: "",
            gender: "",
            marital_status: "",
            number_of_children: "",
            current_jobs: {},
            current_jobs_explanation: "",//temporary not an array
            previous_jobs: {},
            previous_jobs_explanation: "",//temporary not an array
            degrees: {},
            degrees_explanation: "",//temporary not an array
            birth_province: "",
            birth_city: {},
            current_province: {},
            current_city: {},
            current_address: "",
            landline_number: "",
            phone_numbers: {},
            introducing_first_name: "",
            introducing_last_name: "",
            introducing_phone_number: "",
            entertainments: [],
            films: [],
            books: [],
            interests_explanation: "",
            social_media: [],
            disease_history: null,
            disease_history_explanation: "",//temporary not an array
            drug_history: null,
            criminal_history: null,
            criminal_history_explanation: "",//temporary not an array


            haveChildren: true,
            vCodeField: false,
            favoriteFilms: [""],
            favoriteBooks: [""],
            imageProfile: null
        };
        //assets

        this.number_of_children = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        this.jobs = [];
        this.degrees = [];
        // this.birthOrders = {
        //     first: "فرزند اول",
        //     middle: "فرزند میانی",
        //     last: "فرزند آخر"
        // };
        this.birthOrders = ["فرزند اول", "فرزند میانی", "فرزند آخر"];
        this.birthOrdersForJson = ["first", "middle", "last"];
        this.provinces = [];
        this.cities = [];
        this.interests = ['بازی‌های تخته ای'
            , 'پیک نیک'
            , 'شب نشینی'
            , 'بازی‌های رایانه‌ای'
            , 'سفر'
            , 'مهمانی رفتن'
            , 'بازی‌ های متفرقه'
            , 'اردو چند روز'
            , 'رفتن به رستوران'
            , 'بازی‌های کارتی'
            , 'ورزش کردن'
            , 'خرید کردن'
            , 'رفتن به سینما یا تئاتر'
            , 'کوه نوردی'
            , 'دوچرخه سواری'
            , 'فیلم دیدن'
            , 'کتاب خواندن'];


    }

    componentDidMount() {
        console.log('this is my token ===', axiosInstance.axios.defaults.headers.common['Authorization']);
        // axiosInstance.axios.post('/user/get_user/')
        //     .then(userResponse => {
        //         console.log(userResponse.data);
        //         return axiosInstance.axios.get(`/information/profile/${userResponse.data.id}`)
        //     })
        //     .then(profileResponse => {
        //         console.log(profileResponse.data);
        //     })


        //get list of all cities
        axiosInstance.axios.get('/information/city/')
            .then((cities) => {
                this.cities = cities.data.results;
            })

        //get list of all states(provinces)
        axiosInstance.axios.get('/information/state/')
            .then((states) => {
                this.provinces = states.data.results;
            })

        //get list of all jobs
        axiosInstance.axios.get('/information/job/')
            .then((jobs) => {
                this.jobs = jobs.data.results;
            })

        //get list of all degrees
        axiosInstance.axios.get('/information/degree/')
            .then((degrees) => {
                this.degrees = degrees.data.results;
            })

        //get list of all interests
        axiosInstance.axios.get('/information/entertainment/')
            .then((interests) => {
                this.interests = interests.data.results;
            })


    }

    setProfileInfo = async (userId) => {
        axiosInstance.axios.get(`/information/profile/${userId}/`)
            .then(async profileResponse => {
                const usrPro = profileResponse.data;

                //get list of jobs, degrees, city, socials, entertainments, films and books
                let current_jobs = (await axiosInstance.axios.get(usrPro.current_jobs[0])).data;
                let previous_jobs = (await axiosInstance.axios.get(usrPro.previous_jobs[0])).data;
                let degrees = (await axiosInstance.axios.get(usrPro.degrees[0])).data;
                let birth_city = (await axiosInstance.axios.get(usrPro.birth_city)).data;
                let current_city = (await axiosInstance.axios.get(usrPro.current_city)).data;
                let phone_numbers =(await axiosInstance.axios.get(usrPro.phone_numbers[0])).data;
                let entertainments = [];
                //this request may be wrong!
                // usrPro.current_jobs.map(async cr => {
                //     const jobResponse = await axiosInstance.axios.get(cr);
                //     job_names.push(jobResponse.data.name);
                // })

                // for (let i = 0; i < usrPro.current_jobs.length; i++) {
                //     const cr = usrPro.current_jobs[i];
                //     const jobResponse = await axiosInstance.axios.get(cr);
                //     current_jobs.push(jobResponse.data);
                // }
                // for (let i = 0; i < usrPro.previous_jobs.length; i++) {
                //     const prev = usrPro.previous_jobs[i];
                //     const jobResponse = await axiosInstance.axios.get(prev);
                //     previous_job_names.push(jobResponse.data.name);
                // }
                // for (let i = 0; i < usrPro.degrees.length; i++) {
                //     const deg = usrPro.degrees[i];
                //     const degreeResponse = await axiosInstance.axios.get(deg);
                //     degree_names.push(degreeResponse.data.title);
                // }

                // let birthCityResponse = await axiosInstance.axios.get(usrPro.birth_city);
                // birth_city_name = birthCityResponse.data.name;
                // console.log("this is birth city: ", birth_city_name);

                // let currentCityResponse = await axiosInstance.axios.get(usrPro.current_city);
                // current_city_name = currentCityResponse.data.name;
                // console.log("this is current city: ", current_city_name);

                // for (let i = 0; i < usrPro.phone_numbers.length; i++) {
                //     const phoneUrl = usrPro.phone_numbers[i];
                //     const phoneResponse = await axiosInstance.axios.get(phoneUrl);
                //     phone_number_values.push(phoneResponse.data.phone_number);
                // }

                for (let i = 0; i < usrPro.entertainments.length; i++) {
                    const entttUrl = usrPro.entertainments[i];
                    const entertainmentResponse = await axiosInstance.axios.get(entttUrl);
                    entertainments.push(entertainmentResponse.data);
                }


                console.log("this is disesssss", usrPro.disease_history);
                console.log("this is drug", usrPro.drug_history);
                console.log("this is criminals: ", usrPro.criminal_history);

                // console.log("here boy this is usrPro: ");
                // console.log(profileResponse.data.first_name);
                // console.log(profileResponse.data.last_name);

                this.setState((prevState) => ({
                    user_id: userId,
                    first_name: usrPro.first_name,
                    last_name: usrPro.last_name,
                    reference: usrPro.reference,
                    referenced_profiles: usrPro.referenced_profiles,
                    date_of_birth: (usrPro.date_of_birth !== null) ?
                        momentJalaali(usrPro.date_of_birth, "jYYYY/jM/jD") :
                        momentJalaali(),
                    birth_order: usrPro.birth_order,
                    gender: usrPro.gender,
                    marital_status: usrPro.marital_status,
                    haveChildren: usrPro.marital_status !== "single",
                    number_of_children: usrPro.number_of_children,
                    current_jobs: current_jobs, //array
                    current_jobs_explanation: usrPro.current_jobs_explanation,//array
                    previous_jobs: previous_jobs,//array
                    previous_jobs_explanation: usrPro.previous_jobs_explanation,//array
                    degrees: degrees,//array
                    degrees_explanation: usrPro.degrees_explanation,//array
                    birth_city: birth_city,
                    current_city: current_city,
                    current_address: usrPro.current_address,
                    phone_numbers: phone_numbers,//array
                    social_medias: usrPro.social_medias,//array
                    entertainments: entertainments,//array
                    films: usrPro.films,//array
                    books: usrPro.books,//array
                    interests_explanation: usrPro.interests_explanation,
                    disease_history: usrPro.disease_history && usrPro.disease_history,
                    disease_history_explanation: usrPro.disease_history_explanation,
                    drug_history: usrPro.drug_history && usrPro.drug_history,
                    criminal_history: usrPro.criminal_history && usrPro.criminal_history
                }));
            })

        setTimeout(() => {
            console.log("this is entertainments === : ");
            console.log(this.state.entertainments);
        }, 3000);

    }

    handleNextInput = (event) => {
        if (event.keyCode === 13) {
            const form = event.target.form;
            const index = Array.prototype.indexOf.call(form, event.target);
            form.elements[index + 1].focus();
            event.preventDefault();
        }
    };
    handleSubmit = (e) => {
        e.preventDefault();
        axiosInstance.axios.patch(`/information/profile/${this.state.user_id}/`, {current_jobs: [this.state.current_jobs.url]});
        axiosInstance.axios.patch(`/information/profile/${this.state.user_id}/`, {previous_jobs: [this.state.previous_jobs.url]});
        axiosInstance.axios.patch(`/information/profile/${this.state.user_id}/`, {degrees: [this.state.degrees.url]});
    }
    handleOnChange = (event) => {
        console.log("handleOnChange called");
        let name = event.target.name;
        let val = event.target.value;

        this.setState(() => ({[name]: val}));
        console.log(event);
        console.log("event.target.name: " + name);
        console.log("event.target.value: " + val);
    };
    handleOnChangeCaseHistory = (event) => {
        console.log("handle case history called", event.target.name, event.target.value);
        let name = event.target.name;
        this.setState((prevState) => ({
            [name]: !prevState[name]
        }));
    }
    handleOnChangeArrays = (event) => {
        console.log("handle on change select box: ", event.target.value);
        let name = event.target.name;
        let value = [];
        value[0] = event.target.value;
        this.setState(() => ({
            [name]: value
        }))
    }

    handleOnChangeCurrentJob = (event) => {
        console.log('event==', event);
        const selectedCurrentJob = event.target.value;
        this.setState(() => ({current_jobs: this.jobs.find(j => j.name === selectedCurrentJob)}));
    }
    handleOnChangePreviousJob = (event) => {
        console.log('event==', event);
        const selectedPreviousJob = event.target.value;
        this.setState(() => ({previous_jobs: this.jobs.find(j => j.name === selectedPreviousJob)}));
    }
    handleOnChangeDegree = (event) => {
        console.log('event==', event);
        const selectedDegree = event.target.value;
        this.setState(() => ({degrees: this.degrees.find(d => d.title === selectedDegree)}));
    }
    handleOnChangeBirthProvince = (event) => {
        console.log('event==', event);
        const selectedProvince = event.target.value;
        this.setState(() => ({birth_province: this.provinces.find(p => p.name === selectedProvince)}));
    }
    handleOnChangeBirthCity = (event) => {
        console.log('event==', event);
        const selectedCity = event.target.value;
        this.setState(() => ({birth_city: this.cities.find(c => c.name === selectedCity)}));
    }
    handleOnChangeCurrentProvince = (event) => {
        console.log('event==', event);
        const selectedProvince = event.target.value;
        this.setState(() => ({current_province: this.cities.find(p => p.name === selectedProvince)}));
    }
    handleOnChangeCurrentCity = (event) => {
        console.log('event==', event);
        const selectedCity = event.target.value;
        this.setState(() => ({current_province: this.cities.find(c => c.name === selectedCity)}));
    }
    handleOnChangeEntertainments = (event) => {
        console.log('event==', event.target.value.name);
        const selectedEntertainment = event.target.checked;
        this.setState(() => ({entertainments: this.interests.find(i => i.name === selectedEntertainment)}));
    }
    handleMaritalStatus = (event) => {
        console.log("handleMaritalStatus called");
        let name = event.target.name;
        let val = event.target.value;
        if (name === "marital_status" && val === "single") {
            this.setState(() => ({haveChildren: false}));
        } else {
            this.setState(() => ({haveChildren: true}))
        }
        this.setState(() => ({[name]: val}));
        console.log(event);
        console.log("event.target.name: " + name);
        console.log("event.target.value: " + val);

    };
    handleVerificationCode = () => {
        this.setState({vCodeField: true});
    };
    handleAddOption = () => {

    };
    handleImageFile = (event) => {
        this.setState({imageProfile: URL.createObjectURL(event.target.files[0])});
        console.log("you should handle this file!!!");
    }

    render() {
        return (
            <div className={"main-container"}>
                <div className={"right-container"}>
                    <div className={"right-fixed-container"}>
                        <h1 style={{fontFamily: "MJ_thameen, sans-serif", fontSize: "35px", fontWeight: "300"}}>
                            مشخصات من
                        </h1>
                        {/*<div className={"active-sidebar"}>*/}
                        {/*    <nav className={"nav-sections"}>*/}
                        {/*        <ul className={"menu"}>*/}
                        {/*            <li className={"menu-item"}>*/}
                        {/*                <a className={"menu-item-link"} href={"personal-info"}>*/}
                        {/*                    اطلاعات پرسنلی*/}
                        {/*                </a>*/}
                        {/*            </li>*/}
                        {/*            <li className={"menu-item"}>*/}
                        {/*                <a className={"menu-item-link"} href={"entertainments"}>*/}
                        {/*                    علایق*/}
                        {/*                </a>*/}
                        {/*            </li>*/}
                        {/*            <li className={"menu-item"}>*/}
                        {/*                <a className={"menu-item-link"} href={"social-media"}>*/}
                        {/*                    فضای مجازی*/}
                        {/*                </a>*/}
                        {/*            </li>*/}
                        {/*            <li className={"menu-item"}>*/}
                        {/*                <a className={"menu-item-link"} href={"case-history"}>*/}
                        {/*                    سوابق*/}
                        {/*                </a>*/}
                        {/*            </li>*/}
                        {/*            <li className={"menu-item"}>*/}
                        {/*                <a className={"menu-item-link"} href={"#"}>*/}
                        {/*                    مشخصات فیزیکی*/}
                        {/*                </a>*/}
                        {/*            </li>*/}
                        {/*        </ul>*/}
                        {/*    </nav>*/}
                        {/*</div>*/}
                    </div>
                </div>
                <div className={"middle-container"}>
                    <StyledMyProfile>
                        <StyledForm onSubmit={this.handleSubmit}>
                            <div className={"personal-info"}>
                                <div className={"pro-form-group"}>
                                    <UploadFile handleImageFile={this.handleImageFile} id={"image-profile-label"}/>
                                </div>
                                <ChangePassword getUserId={this.setProfileInfo}/>
                                <hr className={"pro-hr"}/>
                                <div className={"inline-form-groups"} style={{alignItems: "flex-start"}}>
                                    <div style={{width: "50%"}}>
                                        <div className={"pro-form-group"}>
                                            <input
                                                type={"text"}
                                                name={"first_name"}
                                                id={"first_name"}
                                                className={"form-field-text"}
                                                placeholder={"نام"}
                                                onChange={this.handleOnChange}
                                                onKeyDown={this.handleNextInput}
                                                // required={true}
                                                value={this.state.first_name}
                                            />
                                            <label htmlFor={"first_name"} className={"form-label-text"}>
                                                نام
                                            </label>
                                        </div>
                                        <div className={"pro-form-group"}>
                                            <input
                                                type={"text"}
                                                name={"last_name"}
                                                id={"last_name"}
                                                className={"form-field-text"}
                                                placeholder={"نام خانوادگی"}
                                                onChange={this.handleOnChange}
                                                onKeyDown={this.handleNextInput}
                                                // required={true}
                                                value={this.state.last_name}
                                            />
                                            <label htmlFor={"last_name"} className={"form-label-text"}>
                                                نام خانوادگی
                                            </label>
                                        </div>
                                    </div>
                                    <div style={{width: "50%"}}>
                                        <div className={"pro-form-group"}>
                                            <input
                                                type={"text"}
                                                name={"introducing_first_name"}
                                                id={"introducing_first_name"}
                                                className={"form-field-text"}
                                                onChange={this.handleOnChange}
                                                placeholder={"نام معرف"}
                                                onKeyDown={this.handleNextInput}
                                                // required={true}
                                                value={this.state.introducing_first_name}
                                            />
                                            <label htmlFor={"introducing_first_name"} className={"form-label-text"}>
                                                نام معرف
                                            </label>
                                        </div>
                                        <div className={"pro-form-group"}>
                                            <input
                                                type={"text"}
                                                name={"introducing_last_name"}
                                                id={"introducing_last_name"}
                                                className={"form-field-text"}
                                                onChange={this.handleOnChange}
                                                placeholder={"نام خانوادگی معرف"}
                                                onKeyDown={this.handleNextInput}
                                                // required={true}
                                                value={this.state.introducing_last_name}
                                            />
                                            <label htmlFor={"introducing_last_name"} className={"form-label-text"}>
                                                نام خانوادگی معرف
                                            </label>
                                        </div>
                                        <div className={"pro-form-group"}>
                                            <input
                                                type={"tel"}
                                                name={"introducing_phone_number"}
                                                id={"introducing_phone_number"}
                                                className={"form-field-text"}
                                                onChange={this.handleOnChange}
                                                placeholder={"شماره همراه معرف"}
                                                onKeyDown={this.handleNextInput}
                                                // required={true}
                                                value={this.state.introducing_phone_number}
                                            />
                                            <label htmlFor={"introducing_phone_number"} className={"form-label-text"}>
                                                شماره همراه معرف
                                            </label>
                                            <div className={"input-field-caption"}>
                                                <span style={{direction: "ltr", fontFamily: "'Segoe UI', sans-serif"}}>
                                                    0913 123 4567
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className={"input-field-caption"}>
                                        <span>
                                            تصویر کارت ملی
                                        </span>
                                    </div>
                                    <label className={"national-card-field"} style={{}}>
                                        <UploadFile handleImageFile={this.handleImageFile} id={"national-card-label"}/>
                                        <img src={uploadIcon} alt={"uploadIcon"} style={{margin: "0 5px"}}/>
                                    </label>
                                </div>
                                <div className={"pro-form-group"} style={{width: "300px"}}>
                                    <DatePicker
                                        id={"date_of_birth"}
                                        timePicker={false}
                                        isGregorian={false}
                                        onChange={date_of_birth => this.setState({date_of_birth})}

                                        value={this.state.date_of_birth}
                                        className={"form-field-text"}
                                        onKeyDown={this.handleNextInput}
                                    />
                                    <label className={"form-label-text"}>
                                        تاریخ تولد
                                    </label>
                                    <img src={calendarIcon} alt={"calendar icon"}
                                         style={{position: "absolute", left: "5px", top: "30px"}}/>
                                </div>
                                <div className={"pro-form-group hide-select-arrow"} style={{width: "300px"}}>
                                    <select
                                        id={"birth_order"}
                                        name={"birth_order"}
                                        className={"select-form-field"}
                                        onKeyDown={this.handleNextInput}
                                        onChange={this.handleOnChange}
                                        value={this.state.birth_order}
                                    >
                                        <option value={""}>فرزند چندم</option>
                                        {this.birthOrders.map((order, index) => (
                                            <option
                                                value={this.birthOrdersForJson[index]}
                                                key={index}
                                            >
                                                {order}
                                            </option>
                                        ))}
                                    </select>
                                    {/*<label htmlFor={"birth_order"} className={"select-form-label"}>*/}
                                    {/*    فرزند چندم*/}
                                    {/*</label>*/}
                                    <img src={arrowBottom} alt={"arrow bottom"} className={"select-arrow-icon"}/>
                                </div>
                                <div className={"pro-form-group"}
                                     style={{width: "300px", justifyContent: "space-between", display: "flex"}}>
                                    <label htmlFor={"gender_male"} className={"form-label-radio checkbox-label"}>
                                        مرد
                                        <input
                                            type={"radio"}
                                            name={"gender"}
                                            className={"form-field-radio"}
                                            id={"gender_male"}
                                            onChange={this.handleOnChange}
                                            onKeyDown={this.handleNextInput}
                                            value={"male"}
                                            checked={this.state.gender === "male"}
                                        />
                                        <span className={"checkmark"}> </span>
                                    </label>
                                    <label htmlFor={"gender_female"} className={"form-label-radio checkbox-label"}>
                                        زن
                                        <input
                                            type={"radio"}
                                            name={"gender"}
                                            className={"form-field-radio"}
                                            id={"gender_female"}
                                            onChange={this.handleOnChange}
                                            onKeyDown={this.handleNextInput}
                                            value={"female"}
                                            checked={this.state.gender === "female"}
                                        />
                                        <span className={"checkmark"}> </span>
                                    </label>
                                </div>
                                <div className={"pro-form-group"}
                                     style={{width: "550px", justifyContent: "space-between", display: "flex"}}>
                                    <label htmlFor={"married"} className={"form-label-radio checkbox-label"}>
                                        متأهل
                                        <input
                                            type={"radio"}
                                            name={"marital_status"}
                                            className={"form-field-radio"}
                                            id={"married"}
                                            value={"married"}
                                            onChange={this.handleMaritalStatus}
                                            checked={this.state.marital_status === "married"}
                                        />
                                        <span className={"checkmark"}> </span>
                                    </label>
                                    <label htmlFor={"single"} className={"form-label-radio checkbox-label"}>
                                        مجرد
                                        <input
                                            type={"radio"}
                                            name={"marital_status"}
                                            className={"form-field-radio"}
                                            id={"single"}
                                            value={"single"}
                                            onKeyDown={this.handleNextInput}
                                            onChange={this.handleMaritalStatus}
                                            checked={this.state.marital_status === "single"}
                                        />
                                        <span className={"checkmark"}> </span>
                                    </label>
                                    <label htmlFor={"divorced"} className={"form-label-radio checkbox-label"}>
                                        متارکه
                                        <input
                                            type={"radio"}
                                            name={"marital_status"}
                                            className={"form-field-radio"}
                                            id={"divorced"}
                                            value={"divorced"}
                                            onKeyDown={this.handleNextInput}
                                            onChange={this.handleMaritalStatus}
                                            checked={this.state.marital_status === "divorced"}
                                        />
                                        <span className={"checkmark"}> </span>
                                    </label>
                                </div>
                                {this.state.haveChildren &&
                                <div className={"pro-form-group hide-select-arrow"} style={{width: "310px"}}>
                                    <select
                                        id={"number_of_children"}
                                        name={"number_of_children"}
                                        className={"select-form-field "}
                                        onKeyDown={this.handleNextInput}
                                        onChange={this.handleOnChange}
                                        disabled={!this.state.haveChildren}
                                        value={this.state.number_of_children}
                                    >
                                        <option value={"تعداد فرزندان"}>تعداد فرزندان</option>
                                        {this.number_of_children.map((number, index) => (
                                            <option
                                                value={number}
                                                key={index}
                                            >
                                                {number}
                                            </option>
                                        ))}
                                    </select>
                                    <img src={arrowBottom} alt={"arrow bottom"} className={"select-arrow-icon"}/>
                                </div>}
                                <div className={"inline-form-groups"}>
                                    <div className={"pro-form-group hide-select-arrow"} style={{marginLeft: '40px'}}>
                                        <select
                                            id={"current_jobs"}
                                            name={"current_jobs"}
                                            className={"select-form-field "}
                                            onKeyDown={this.handleNextInput}
                                            onChange={this.handleOnChangeCurrentJob}
                                            value={this.state.current_jobs.name}//must be this.state.current_jobs[i].name for later
                                        >
                                            <option value={""}>شغل فعلی</option>
                                            {this.jobs.map((job, index) => (
                                                <option
                                                    value={job.name}
                                                    key={index}
                                                >
                                                    {job.name}
                                                </option>
                                            ))}
                                        </select>
                                        <img src={arrowBottom} alt={"arrow bottom"} className={"select-arrow-icon"}/>
                                    </div>
                                    <div className={"pro-form-group"}>
                                        <input
                                            type={"text"}
                                            name={"current_jobs_explanation"}
                                            id={"current_jobs_explanation"}
                                            className={"form-field-text"}
                                            onChange={this.handleOnChange}
                                            placeholder={"توضیحات"}
                                            onKeyDown={this.handleNextInput}
                                            style={{width: "600px"}}
                                            value={this.state.current_jobs_explanation}
                                        />
                                        <label htmlFor={"current_jobs_explanation"} className={"form-label-text"}>
                                            توضیحات
                                        </label>
                                    </div>
                                </div>
                                <div className={"inline-form-groups"}>
                                    <div className={"pro-form-group hide-select-arrow"} style={{marginLeft: '40px'}}>
                                        <select
                                            id={"previous_jobs"}
                                            name={"previous_jobs"}
                                            className={"select-form-field"}
                                            onKeyDown={this.handleNextInput}
                                            onChange={this.handleOnChangePreviousJob}
                                            value={this.state.previous_jobs.name}//must be this.state.previous_jobs[i].name for later
                                        >
                                            <option value={""}>شغل قبلی</option>
                                            {this.jobs.map((job, index) => (
                                                <option value={job.name} key={index}>
                                                    {job.name}
                                                </option>
                                            ))}
                                        </select>
                                        <img src={arrowBottom} alt={"arrow bottom"} className={"select-arrow-icon"}/>
                                    </div>
                                    <div className={"pro-form-group"}>
                                        <input
                                            type={"text"}
                                            name={"previous_jobs_explanation"}
                                            id={"previous_jobs_explanation"}
                                            className={"form-field-text"}
                                            onChange={this.handleOnChange}
                                            placeholder={"توضیحات"}
                                            onKeyDown={this.handleNextInput}
                                            style={{width: "600px"}}
                                            value={this.state.previous_jobs_explanation}
                                        />
                                        <label htmlFor={"previous_jobs_explanation"} className={"form-label-text"}>
                                            توضیحات
                                        </label>
                                    </div>
                                </div>
                                <div className={"inline-form-groups"}>
                                    <div className={"pro-form-group hide-select-arrow"} style={{marginLeft: '40px'}}>
                                        <select
                                            id={"degrees"}
                                            name={"degrees"}
                                            className={"select-form-field"}
                                            onKeyDown={this.handleNextInput}
                                            onChange={this.handleOnChangeDegree}
                                            value={this.state.degrees.title}//must be this.state.degrees[i].title for later
                                        >
                                            <option value={""}>مدرک تحصیلی</option>
                                            {this.degrees.map((degree, index) => (
                                                <option value={degree.title} key={index}>
                                                    {degree.title}
                                                </option>
                                            ))}
                                        </select>
                                        <img src={arrowBottom} alt={"arrow bottom"} className={"select-arrow-icon"}/>
                                    </div>
                                    <div className={"pro-form-group"}>
                                        <input
                                            type={"text"}
                                            name={"degrees_explanation"}
                                            id={"degrees_explanation"}
                                            className={"form-field-text"}
                                            onChange={this.handleOnChange}
                                            placeholder={"رشته تحصیلی"}
                                            onKeyDown={this.handleNextInput}
                                            style={{width: "600px"}}
                                            value={this.state.degrees_explanation}
                                        />
                                        <label htmlFor={"degree_explanation"} className={"form-label-text"}>
                                            رشته تحصیلی
                                        </label>
                                    </div>
                                </div>
                                <div className={"inline-form-groups"}>
                                    <div className={"pro-form-group hide-select-arrow"} style={{marginLeft: '40px'}}>
                                        <select
                                            id={"birth_province"}
                                            name={"birth_province"}
                                            className={"select-form-field"}
                                            onKeyDown={this.handleNextInput}
                                            onChange={this.handleOnChangeBirthProvince}
                                            value={this.state.birth_province.name}
                                        >
                                            <option value={""}>استان محل تولد</option>
                                            {this.provinces.map((province, index) => (
                                                <option value={province.name} key={index}>
                                                    {province.name}
                                                </option>
                                            ))}
                                        </select>
                                        <img src={arrowBottom} alt={"arrow bottom"} className={"select-arrow-icon"}/>
                                    </div>
                                    <div className={"pro-form-group hide-select-arrow"}>
                                        <select
                                            id={"birth_city"}
                                            name={"birth_city"}
                                            className={"select-form-field"}
                                            onKeyDown={this.handleNextInput}
                                            onChange={this.handleOnChangeBirthCity}
                                            value={this.state.birth_city.name}
                                        >
                                            <option value={""}>شهر محل تولد</option>
                                            {this.cities.map((city, index) => (
                                                <option value={city.name} key={index}>
                                                    {city.name}
                                                </option>
                                            ))}
                                        </select>
                                        <img src={arrowBottom} alt={"arrow bottom"} className={"select-arrow-icon"}/>
                                    </div>
                                </div>
                                <div className={"inline-form-groups"}>
                                    <div className={"pro-form-group hide-select-arrow"} style={{marginLeft: '40px'}}>
                                        <select
                                            id={"current_province"}
                                            name={"current_province"}
                                            className={"select-form-field"}
                                            onKeyDown={this.handleNextInput}
                                            onChange={this.handleOnChangeCurrentProvince}
                                            value={this.state.current_province.name}
                                        >
                                            <option value={""}>استان محل سکونت</option>
                                            {this.provinces.map((province, index) => (
                                                <option value={province.name} key={index}>
                                                    {province.name}
                                                </option>
                                            ))}
                                        </select>
                                        <img src={arrowBottom} alt={"arrow bottom"} className={"select-arrow-icon"}/>
                                    </div>
                                    <div className={"pro-form-group hide-select-arrow"} style={{marginLeft: '40px'}}>
                                        <select
                                            id={"current_city"}
                                            name={"current_city"}
                                            className={"select-form-field"}
                                            onKeyDown={this.handleNextInput}
                                            onChange={this.handleOnChangeCurrentCity}
                                            value={this.state.current_city.name}
                                        >
                                            <option value={""}>شهر محل سکونت</option>
                                            {this.cities.map((city, index) => (
                                                <option value={city.name} key={index}>
                                                    {city.name}
                                                </option>
                                            ))}
                                        </select>
                                        <img src={arrowBottom} alt={"arrow bottom"} className={"select-arrow-icon"}/>
                                    </div>
                                </div>
                                <div className={"pro-form-group"}>
                                    <input
                                        type={"text"}
                                        name={"current_address"}
                                        id={"current_address"}
                                        className={"form-field-text"}
                                        onChange={this.handleOnChange}
                                        placeholder={"آدرس محل سکونت"}
                                        onKeyDown={this.handleNextInput}
                                        // required={true}
                                        style={{width: "660px"}}
                                        value={this.state.current_address}
                                    />
                                    <label htmlFor={"current_address"} className={"form-label-text"}>
                                        آدرس محل سکونت
                                    </label>
                                </div>
                                <div className={"pro-form-group"}>
                                    <input
                                        name={"landline_number"}
                                        type={"tel"}
                                        id={"landline_number"}
                                        className={"form-field-text"}
                                        placeholder={"شماره ثابت"}
                                        // required={true}
                                        onKeyDown={this.handleNextInput}
                                    />
                                    <label htmlFor={"landline_number"} className={"form-label-text"}>
                                        شماره ثابت
                                    </label>
                                    <div className={"input-field-caption"}>
                                            <span style={{direction: "ltr", fontFamily: "'Segoe UI', sans-serif"}}>
                                                031 34567890
                                            </span>
                                    </div>
                                </div>
                                <div className={"inline-form-groups"}>
                                    <div className={"pro-form-group"} style={{marginLeft: '40px'}}>
                                        <input
                                            name={"phone_numbers"}
                                            type={"tel"}
                                            id={"phone_numbers"}
                                            className={"form-field-text"}
                                            placeholder={"شماره همراه"}
                                            pattern={"[0-9]{10}"}
                                            // required={true}
                                            disabled={true}
                                            onChange={this.handleOnChange}
                                            onKeyDown={this.handleNextInput}
                                            value={this.state.phone_numbers.phone_number}//must be this.state.phone_numbers[i].phone_number for later
                                        />
                                        <label htmlFor={"phone_numbers"} className={"form-label-text"}>
                                            شماره همراه
                                        </label>
                                        <div className={"input-field-caption"}>
                                            <span style={{direction: "ltr", fontFamily: "'Segoe UI', sans-serif"}}>
                                                0913 123 4567
                                            </span>
                                        </div>
                                    </div>
                                    <div className={"pro-form-group"}>
                                        <input
                                            name={"verification_code"}
                                            type={"text"}
                                            id={"verification_code"}
                                            className={"form-field-text"}
                                            placeholder={"کد اعتبارسنجی"}
                                            pattern={".{5}"}
                                            required={this.state.vCodeField}
                                            disabled={!this.state.vCodeField}
                                            onKeyDown={this.handleNextInput}
                                            onChange={this.handleOnChange}
                                        />
                                        <label htmlFor={"verification_code"} className={"form-label-text"}>
                                            کد اعتبارسنجی
                                        </label>
                                        <div className={"input-field-caption"}>
                                            <button type={"button"} onClick={this.handleVerificationCode}>
                                                دریافت کد اعتبار سنجی
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={"entertainments"}>
                                <h3 id={"entertainments-header"}>
                                    تفریحات من
                                </h3>
                                <div id={"favorite-habits-container"}>
                                    {this.interests.map((interest, i) =>
                                        (
                                            <div className={"pro-form-group"} key={i}>
                                                <label htmlFor={"entertainments" + i} className={"checkbox-label"}>
                                                    {interest.name}
                                                    <input
                                                        type={"checkbox"}
                                                        className={"checkbox-input"}
                                                        id={"entertainments" + i}
                                                        name={"entertainments" + i}
                                                        // value={this.interests[i].name}
                                                        checked={!!this.state.entertainments[i]}
                                                        disabled={true}
                                                        onChange={this.handleOnChangeEntertainments}
                                                    />
                                                    <span className={"checkmark"}> </span>
                                                </label>
                                            </div>
                                        )
                                    )}
                                </div>
                                <div className={"favorite-films-books-container"}>
                                    <div className={"pro-form-group"}>
                                        <input
                                            type={"text"}
                                            name={"favorite_films"}
                                            id={"favorite_films"}
                                            className={"form-field-text"}
                                            onChange={this.handleOnChange}
                                            placeholder={"فیلم یا سریال محبوب من"}
                                            // required={true}
                                            style={{width: "400px"}}
                                        />
                                        <label htmlFor={"favorite_films"} className={"form-label-text"}>
                                            فیلم یا سریال محبوب من
                                        </label>
                                    </div>
                                    <button type={"button"} onClick={this.handleAddOption} className={"form-add-btn"}>
                                        +
                                    </button>
                                    {this.state.favoriteFilms.map((favFilm, index) => {
                                        return (
                                            <span key={index}>
                                        {favFilm}
                                    </span>
                                        )
                                    })}
                                </div>
                                <div className={"favorite-films-books-container"}>
                                    <div className={"pro-form-group"}>
                                        <input
                                            type={"text"}
                                            name={"favorite_books"}
                                            id={"favorite_books"}
                                            className={"form-field-text"}
                                            onChange={this.handleOnChange}
                                            placeholder={"کتاب محبوب من"}
                                            // required={true}
                                            style={{width: "400px"}}
                                        />
                                        <label htmlFor={"favorite_books"} className={"form-label-text"}>
                                            کتاب محبوب من
                                        </label>
                                    </div>
                                    <button type={"button"} onClick={this.handleAddOption} className={"form-add-btn"}>
                                        +
                                    </button>
                                    {this.state.favoriteBooks.map((book, index) => {
                                        return (
                                            <span key={index}>
                                        {book}
                                    </span>
                                        )
                                    })}
                                </div>
                                <div className={"pro-form-group"}>
                                    <input
                                        type={"text"}
                                        name={"interests_explanation"}
                                        id={"interests_explanation"}
                                        className={"form-field-text"}
                                        onChange={this.handleOnChange}
                                        placeholder={"توضیحات تکمیلی درمورد علایق"}
                                        onKeyDown={this.handleNextInput}
                                        // required={true}
                                        style={{width: "600px"}}
                                        value={this.state.interests_explanation}
                                    />
                                    <label htmlFor={"interests_explanation"} className={"form-label-text"}>
                                        توضیحات تکمیلی درمورد علایق
                                    </label>
                                </div>

                            </div>
                            <div className={"social-media"}>
                                <div className={"social-media-input"}>
                                    <img src={mail} alt={"mail"}/>
                                    <input
                                        type={"text"}
                                        name={"mail"}
                                        id={"mail"}
                                        className={"form-field-text"}
                                        onChange={this.handleOnChange}
                                    />
                                </div>
                                <div className={"social-media-input"}>
                                    <img src={whatsapp} alt={"whatsapp"}/>
                                    <input
                                        type={"text"}
                                        name={"whatsapp"}
                                        id={"whatsapp"}
                                        className={"form-field-text"}
                                        onChange={this.handleOnChange}
                                    />
                                </div>
                                <div className={"social-media-input"}>
                                    <img src={telegram} alt={"telegram"}/>
                                    <input
                                        type={"text"}
                                        name={"telegram"}
                                        id={"telegram"}
                                        className={"form-field-text"}
                                        onChange={this.handleOnChange}
                                    />
                                </div>
                                <div className={"social-media-input"}>
                                    <img src={instagram} alt={"instagram"}/>
                                    <input
                                        type={"text"}
                                        name={"instagram"}
                                        id={"instagram"}
                                        className={"form-field-text"}
                                        onChange={this.handleOnChange}
                                    />
                                </div>
                                <div className={"social-media-input"}>
                                    <img src={facebook} alt={"facebook"}/>
                                    <input
                                        type={"text"}
                                        name={"facebook"}
                                        id={"facebook"}
                                        className={"form-field-text"}
                                        onChange={this.handleOnChange}
                                    />
                                </div>
                                <div className={"social-media-input"}>
                                    <img src={youtube} alt={"youtube"}/>
                                    <input
                                        type={"text"}
                                        name={"youtube"}
                                        id={"youtube"}
                                        className={"form-field-text"}
                                        onChange={this.handleOnChange}
                                    />
                                </div>
                                <div className={"social-media-input"}>
                                    <img src={twitter} alt={"twitter"}/>
                                    <input
                                        type={"text"}
                                        name={"twitter"}
                                        id={"twitter"}
                                        className={"form-field-text"}
                                        onChange={this.handleOnChange}
                                    />
                                </div>
                            </div>
                            <div className={"case-history"}>
                                <div className={"case-diseases inline-form-groups"}>
                                    <span style={{width: "45%"}}>
                                        سابقه بیماری جسمی یا روحی
                                    </span>
                                    <div style={{width: "45%"}}>
                                        <label htmlFor={"has_disease_history"}
                                               className={"form-label-radio checkbox-label"}>
                                            دارم
                                            <input
                                                type={"radio"}
                                                name={"disease_history"}
                                                className={"form-field-radio"}
                                                id={"has_disease_history"}
                                                value={this.state.disease_history}
                                                checked={this.state.disease_history}
                                                onChange={this.handleOnChangeCaseHistory}
                                            />
                                            <span className={"checkmark"}> </span>
                                        </label>
                                        <label htmlFor={"has_not_disease_history"}
                                               className={"form-label-radio checkbox-label"}>
                                            ندارم
                                            <input
                                                type={"radio"}
                                                name={"disease_history"}
                                                className={"form-field-radio"}
                                                id={"has_not_disease_history"}
                                                value={this.state.disease_history}
                                                checked={!this.state.disease_history}
                                                onChange={this.handleOnChangeCaseHistory}
                                            />
                                            <span className={"checkmark"}> </span>
                                        </label>
                                    </div>
                                    {/*<div className={"pro-form-group"} style={{width: "100%", paddingRight: "44%"}}>*/}
                                    {/*    <input*/}
                                    {/*        type={"text"}*/}
                                    {/*        name={"disease_history_explanation"}*/}
                                    {/*        id={"disease_history_explanation"}*/}
                                    {/*        className={"form-field-text"}*/}
                                    {/*        onChange={this.handleOnChange}*/}
                                    {/*        placeholder={"توضیح دهید"}*/}
                                    {/*        onKeyDown={this.handleNextInput}*/}
                                    {/*        style={{width: "50%", borderColor: "#606060"}}*/}
                                    {/*    />*/}
                                    {/*    <label htmlFor={"disease_history_explanation"} className={"form-label-text checkbox-label"}*/}
                                    {/*           style={{color: "#606060"}}>*/}
                                    {/*        توضیح دهید*/}
                                    {/*    </label>*/}
                                    {/*</div>*/}
                                </div>
                                <div className={"case-drug inline-form-groups"}>
                                    <span style={{width: "45%"}}>
                                        سابقه مصرف دارو
                                    </span>
                                    <div style={{width: "45%"}}>
                                        <label htmlFor={"has_drug_history"}
                                               className={"form-label-radio checkbox-label"}>
                                            دارم
                                            <input
                                                type={"radio"}
                                                name={"drug_history"}
                                                className={"form-field-radio"}
                                                id={"has_drug_history"}
                                                value={this.state.drug_history}
                                                checked={this.state.drug_history}
                                                onChange={this.handleOnChangeCaseHistory}
                                            />
                                            <span className={"checkmark"}> </span>
                                        </label>
                                        <label htmlFor={"has_not_drug_history"}
                                               className={"form-label-radio checkbox-label"}>
                                            ندارم
                                            <input
                                                type={"radio"}
                                                name={"drug_history"}
                                                className={"form-field-radio"}
                                                id={"has_not_drug_history"}
                                                value={this.state.drug_history}
                                                checked={!this.state.drug_history}
                                                onChange={this.handleOnChangeCaseHistory}
                                            />
                                            <span className={"checkmark"}> </span>
                                        </label>
                                    </div>
                                </div>
                                <div className={"case-criminal inline-form-groups"}>
                                    <span style={{width: "45%"}}>
                                        سابقه کیفری
                                    </span>
                                    <div style={{width: "45%"}}>
                                        <label htmlFor={"has_criminal_history"}
                                               className={"form-label-radio checkbox-label"}>
                                            دارم
                                            <input
                                                type={"radio"}
                                                name={"criminal_history"}
                                                className={"form-field-radio"}
                                                id={"has_criminal_history"}
                                                value={this.state.criminal_history}
                                                checked={this.state.criminal_history}
                                                onChange={this.handleOnChangeCaseHistory}
                                            />
                                            <span className={"checkmark"}> </span>
                                        </label>
                                        <label htmlFor={"has_not_criminal_history"}
                                               className={"form-label-radio checkbox-label"}>
                                            ندارم
                                            <input
                                                type={"radio"}
                                                name={"criminal_history"}
                                                className={"form-field-radio"}
                                                id={"has_not_criminal_history"}
                                                value={this.state.criminal_history}
                                                checked={!this.state.criminal_history}
                                                onChange={this.handleOnChangeCaseHistory}
                                            />
                                            <span className={"checkmark"}> </span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </StyledForm>
                    </StyledMyProfile>
                </div>
                <div className={"left-container"}>
                    <div className={"left-fixed-container"}>
                        <HomePageLink className={"top-left-home-page-logo"}/>
                        <div className={"pro-submit-btn-container"}>
                            <button type={"button"} className={"edit-profile-btn"} onClick={this.handleSubmit}>
                                ثبت تغییرات
                            </button>
                        </div>
                        <MenuLink className={"down-left-menu-link"}/>
                    </div>
                </div>
            </div>
        );
    }
}