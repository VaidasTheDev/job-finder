<template>
  <div class="p-field">
    <label :for="inputId">{{ label }}</label>
    <Password
      :class="{
        'p-invalid' : error
      }"
      v-if="type === 'password'"
      v-model="value"
      :id="inputId"
      :aria-describedby="`${inputId}-help`"
      :feedback="false"
      :autocomplete="autocomplete"
      :disabled="disabled"
      @keyup="updateValue"
    />
    <InputText
      :class="{
        'p-invalid' : error
      }"
      v-else
      type="text"
      v-model="value"
      :id="inputId"
      :aria-describedby="`${inputId}-help`"
      :autocomplete="autocomplete"
      :disabled="disabled"
      @keyup="updateValue"
    />
    <small
      :id="`${inputId}-help`"
      v-if="isHelpTextPresent"
      :class="{
        'p-error' : error
      }"
    >
      {{ helpText }}
    </small>
  </div>
</template>

<script>
import Password from "primevue/password";
import InputText from "primevue/inputtext";
import { isNil } from "lodash";

export default {
  name: "InputField",
  components: {
    Password,
    InputText
  },
  props: {
    inputId: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    helpText: {
      type: String
    },
    type: {
      type: String,
      default: "text"
    },
    value: [String, Number],
    autocomplete: {
      type: String,
      default: "off"
    },
    error: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ["update"],
  computed: {
    isHelpTextPresent() {
      return !isNil(this.helpText);
    }
  },
  methods: {
    updateValue(event) {
      this.$emit("update", event.target.value);
    }
  }
}
</script>