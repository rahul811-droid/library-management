import mongoose from "mongoose";

const studentDetailsSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  profilePicture: {
    type: String,
    default:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  dateOfJoining: {
    type: Date,
    default: Date.now
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true
  },
  AdharcardNo: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function (v) {
        return /^\d{12}$/.test(v);
      },
      message: props => `${props.value} is not a valid Adhar card number! It should be exactly 12 digits.`
    }
  },
  address: [{
    street: {
      type: String,
      trim: true
    },
    city: {
      type: String,
      trim: true
    },
    state: {
      type: String,
      trim: true
    },
    postalCode: {
      type: String,
      trim: true
    },
    country: {
      type: String,
      trim: true
    }
  }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware to set updatedAt
studentDetailsSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Student = mongoose.model('Student', studentDetailsSchema);

export default Student;
