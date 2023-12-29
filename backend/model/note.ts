/**
 * Keep this file in sync with the code in the "Usage of `sequelize.define`"
 * section in /docs/manual/other-topics/typescript.md
 *
 * Don't include this comment in the md file.
 */
import { Model, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import sequelize from '../config/db';

// We recommend you declare an interface for the attributes, for stricter typechecking

interface NoteModel extends Model<InferAttributes<NoteModel>, InferCreationAttributes<NoteModel>> {
  // Some fields are optional when calling NoteModel.create() or NoteModel.build()
  id: string;
  title: string;
  body: string;
  createdAt?: Date;
}

const Note = sequelize.define<NoteModel>('Note', {
  id: {
    primaryKey: true,
    type: DataTypes.CHAR(12),
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

export default Note;
