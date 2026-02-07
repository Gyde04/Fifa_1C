import studyMaterials from '../data/studyMaterials';

const studyService = {
  getAll() {
    return studyMaterials.filter(m => m.isActive);
  },

  getByType(type) {
    return this.getAll().filter(m => m.type === type);
  },

  getByCategory(category) {
    return this.getAll().filter(m => m.category === category);
  },

  getById(id) {
    return studyMaterials.find(m => m.id === id) || null;
  },

  search(query) {
    const lower = query.toLowerCase();
    return this.getAll().filter(
      m => m.title.toLowerCase().includes(lower) ||
           m.description.toLowerCase().includes(lower)
    );
  },
};

export default studyService;
