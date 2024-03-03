export const load = async () => {
	const [first, second, third] = await Promise.all([
		new Promise((resolve) => setTimeout(resolve, 1000)),
		new Promise((resolve) => setTimeout(resolve, 2000)),
		new Promise((resolve) => setTimeout(resolve, 2000))
	]);

	return {
		first,
		second,
		third
	};
};
