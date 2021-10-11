import userModel from './../user/user.model';
import CreateUserDto from './user.dto';

class UserService {
  public user = userModel;

  public async insertNewUser(user: CreateUserDto) {
    const newUser = new this.user(user);
    return await this.user.create(newUser);
  }

  public async addUserHobby(userId: string, hobbyId: string) {
    return await this.user.findByIdAndUpdate(userId, { $push: { hobbies: hobbyId } });
  }

  public async getUserHobbies(userId: string) {
    return await this.user.findById(userId).select('hobbies').populate('hobbies');
  }

  public async removeUserHobby(userId: string, hobbyId: string) {
    return await this.user.findByIdAndUpdate(userId, { $pull: { hobbies: hobbyId } });
  }

}

export default UserService;
