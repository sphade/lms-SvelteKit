import type { AuthModel, RecordModel } from 'pocketbase';
import type { CourseSchema } from './schema';

// export type Course = RecordModel & CourseSchema & {
// 	title: string;
// 	description: string;
// 	imageUrl: string;
// 	price: number;
// 	isPublished: boolean;
// 	categoryId: string;
// 	userId: string;
// 	expand: {
// 		category: Category;
// 	};
// };
export type Course = RecordModel &
	CourseSchema & {
		user: string;
		expand?: {
			category: Category;
			user: AuthModel;
			'attachments(course)'?: Attachment[];
			'chapters(course)'?: Chapter[];
			'purchase(course)'?: Purchase[];
		};
	};
export type Category = RecordModel & {
	name: string;
};
export type Attachment = RecordModel & {
	name: string;
	url: File;
	course: string;
	expand: {
		course: Course;
	};
};
export type Chapter = RecordModel & {
	title: string;
	description: string;
	position: number;
	videoUrl: string;
	isPublished: boolean;
	isFree: boolean;
	course: string;
	expand?: {
		'muxData(chapterId)'?: MuxData[];
	};
};
export type MuxData = RecordModel & {
	assetId: string;
	playbackId: string;
	chapterId: boolean;
};
export type UserProgress = RecordModel & {
	user: string;
	chapter: string;
	isCompleted: boolean;
};
export type Purchase = RecordModel & {
	user: string;
	course: string;
};

export type Progress = {
	progress: number | null;
};
export type CourseWithProgressWithCategory = Course & {
	// category: Category | null;
	// chapters: { id: string }[];
	progress: number | null;
};
