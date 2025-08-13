package de.expenses.annotation;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.core.MethodParameter;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;
import org.springframework.web.bind.MissingServletRequestParameterException;

import java.lang.annotation.Annotation;

public abstract class AbstractRequestAttributeArgumentResolver implements HandlerMethodArgumentResolver {

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return parameter.hasParameterAnnotation(getAnnotationClass())
                && parameter.getParameterType().equals(String.class);
    }

    @Override
    public Object resolveArgument(MethodParameter parameter,
                                  ModelAndViewContainer mavContainer,
                                  NativeWebRequest webRequest,
                                  WebDataBinderFactory binderFactory) throws MissingServletRequestParameterException {
        HttpServletRequest request = (HttpServletRequest) webRequest.getNativeRequest();
        String attributeValue = (String) request.getAttribute(getAttributeName());

        if (attributeValue == null) {
            if (isRequired(parameter)) {
                throw new MissingServletRequestParameterException(getAttributeName(), String.class.getSimpleName());
            }
        }

        return attributeValue;
    }

    private boolean isRequired(MethodParameter parameter) {
        Annotation annotation = parameter.getParameterAnnotation(getAnnotationClass());
        try {
            return (boolean) annotation.getClass().getMethod("required").invoke(annotation);
        } catch (Exception e) {
            return true; // Default to true if the method doesn't exist or fails
        }
    }

    protected abstract Class<? extends Annotation> getAnnotationClass();

    protected abstract String getAttributeName();
}
