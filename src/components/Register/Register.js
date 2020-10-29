import React from 'react';

class Register extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			email : '',
			password : '',
			name : ''
		}
	}

	onChangeEmail = (event) => {
		this.setState({
			email : event.target.value
		});
	}

	onChangePassword = (event) => {
		this.setState({
			password : event.target.value
		});
	}

	onChangeName = (event) => {
		this.setState({
			name : event.target.value
		});
	}

	onSubmitRegister = () => {
		let resok = true;
		fetch('http://localhost:4000/register',{
			method : 'POST',
			headers : {
				'Content-Type' : 'application/json'
			},
			body : JSON.stringify(this.state)
		})
		.then(res => {
			resok = res.ok;
			return res.json();
		})
		.then(data => {
			if(resok){
				console.log('Registered successfully!')
				this.props.loadUser(data);
				this.props.onRouteChange('home');
			}else{
				console.log('Response not ok');
			}
		})
		.catch(err => {
			console.log('register catch error : ',err);
		})
	}

	render(){
		return(
			<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
			<main className="pa4 black-80">
			<div className="measure">
				<fieldset id="sign_up" className="ba b--transparent ph0 mh0">
					<legend className="f1 fw6 ph0 mh0">Register</legend>
					<div className="mt3">
						<label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
						<input
							className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
							type="text"
							name="name"
							id="name"
							onChange={this.onChangeName}
						/>
					</div>
					<div className="mt3">
						<label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
						<input
							className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
							type="email"
							name="email-address"
							id="email-address"
							onChange={this.onChangeEmail}
						/>
					</div>
					<div className="mv3">
						<label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
						<input
							className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
							type="password"
							name="password"
							id="password" 
							onChange={this.onChangePassword}
						/>
					</div>
				</fieldset>
				<div className="">
					<input
						onClick={this.onSubmitRegister} 
						className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
						type="submit" 
						value="Register"
					/>
				</div>
			</div>
			</main>
			</article>
		);
	}
}

export default Register;