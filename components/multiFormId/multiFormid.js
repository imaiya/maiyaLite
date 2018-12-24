Component({

  properties: {

  },

  data: {

  },

  methods: {
    getFormId: function(e) {
      console.log(e.detail.formId)

      this.triggerEvent('accessFormid', {
        formId: e.detail.formId
      });
    }
  }
})