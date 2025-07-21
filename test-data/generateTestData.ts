import { v4 as uuidv4 } from 'uuid';
export interface UserData {
  email: string;
  fullName: string;
  password: string;
  bio: string;
}



export interface ContentData {
  title: string;
  body: string;
  tags: string;
  imageName: string;
}



/**
 * Utility for generating dynamic and randomized test data for various entities.
 * Generates data without tracking duplicates for simplicity in CI and dev environments.
 */
export class TestDataGenerator {
  
  static uniqueFullname(): string {
    return this.generate('user_', 8);
  }

  static uniqueEmail(): string {
    return this.generate('test_', 8, '@example.com');
  }

  static uniqueBio(): string {
        return this.generate('Bio', 50);
  }

  static uniqueContentTitle(): string{
            return this.generate('Title', 20);
  }

  static uniqueTag(): string{
            return this.generate('tag', 3);
  }
  

  private static generate(prefix: string, slice: number, suffix: string = ''): string {
    return `${prefix}${uuidv4().slice(0, slice)}${suffix}`;
  }

}
