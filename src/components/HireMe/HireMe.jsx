import { Fragment } from 'react';
import css from './HireMe.module.css';
import { Helmet } from 'react-helmet-async';
import { AnimatePresence, motion } from 'framer-motion';
// import './EmailForm.css';
import emailjs from '@emailjs/browser';
import { useRef } from 'react';

export default function HireMe() {
	const form = useRef();

	const sendMail = (e) => {
		e.preventDefault();

		emailjs
			.sendForm(
				'service_chkvu3e',
				'template_mur17vq',
				form.current,
				'FYpLgBQHMD89fNpxp'
			)
			.then(
				(result) => {
					console.log(result.text);
					console.log('message sent!');
				},
				(error) => {
					console.log(error.text);
					console.log('error sending message, try again!');
				}
			);
	};

	return (
		<Fragment>
			<Helmet>
				<title>Sebastian Klein - Hire Me</title>
			</Helmet>
			<AnimatePresence>
				<motion.div
					className={css.HireMe}
					initial={{ opacity: 0, transition: { duration: 1 } }}
					animate={{ opacity: 1, transition: { duration: 1 } }}
					exit={{ opacity: 0, transition: { duration: 1 } }}
					key={'hireMe'}
				>
					<div className={css.side}>
						<div className={css.article}>
							Want to <span className={css.decoration}>hire</span> me?
							<br />
							<span className={css.decoration}>Please</span> reach out!
						</div>
						<div className={css.placeholder}> </div>
					</div>
					<div className={css.form}>
						<div>
							<form ref={form} onSubmit={sendMail}>
								<fieldset className={css.field}>
									<div>
										<input
											className={css.text}
											type="text"
											name="FirstName"
											placeholder="First Name*"
											required
										/>
									</div>

									<br />

									<div>
										<input
											className={css.text}
											type="text>"
											name="LastName"
											placeholder="Last Name*"
											required
										/>
									</div>

									<br />

									<div>
										<input
											className={css.text}
											type="email"
											name="user_email"
											placeholder="Email*"
											required
										/>
									</div>

									<br />

									<div>
										<input
											className={css.text}
											type="text>"
											name="Company"
											placeholder="Company*"
											required
										/>
									</div>

									<br />
									<textarea
										className={css.textarea}
										type="textarea"
										name="Message"
										placeholder="Message*"
										required
									/>
									<br />
									<div>
										<input
											className={css.submit}
											type="submit"
											value="Submit"
										/>
										<span className={css.required}>*required</span>
									</div>
								</fieldset>
							</form>
						</div>
					</div>
				</motion.div>
			</AnimatePresence>
		</Fragment>
	);
}
