import { Fragment } from 'react';
import css from './HireMe.module.css';
import { Helmet } from 'react-helmet-async';
import { AnimatePresence, motion } from 'framer-motion';

export default function HireMe() {
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
							<form>
								<fieldset className={css.field}>
									<div>
										<input
											className={css.text}
											type="text"
											name="Name"
											placeholder="Name"
										/>
									</div>

									<br />

									<div>
										<input
											className={css.text}
											type="text>"
											name="LastName"
											placeholder="Last Name"
										/>
									</div>

									<br />

									<div>
										<input
											className={css.text}
											type="text>"
											name="Company"
											placeholder="Company"
										/>
									</div>

									<br />
									<textarea
										className={css.textarea}
										type="textarea"
										name="Message"
										placeholder="Message"
									/>
									<br />
									<input className={css.submit} type="submit" value="Submit" />
								</fieldset>
							</form>
						</div>
					</div>
				</motion.div>
			</AnimatePresence>
		</Fragment>
	);
}
