export function fillForm({name, type, label, form}) {
    const field = document.createElement("div");
    field.classList.add("form-group");

    const input = document.createElement("input");
    input.name = name;
    input.type = type;

    const label = document.createElement("label");
    label.for = name;
    label.textContent = `${label}:`;

    field.appendChild(label);
    field.appendChild(input);

    form.appendChild(field);
}

export function fillFormFilled({name, option_1, option_2, label, form}) {
    const field = document.createElement("div");
    field.classList.add("form-group");

    const option1 = document.createElement("option");
    option1.value = true;

    const option2 = document.createElement("option");
    option2.value = false;

    const select = document.createElement("select");
    select.name = name;

    const label = document.createElement("label");
    label.for = name;
    label.textContent = `${label}:`;

    select.appendChild(option1);
    select.appendChild(option2);

    field.appendChild(label);
    field.appendChild(select);

    form.appendChild(field);
}